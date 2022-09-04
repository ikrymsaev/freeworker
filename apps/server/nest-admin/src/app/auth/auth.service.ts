import { PersonEntity } from '@freeworker/entities';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Not, Repository } from 'typeorm';

import { SignInDto, SignUpDto } from './dto/auth.dto';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    @InjectRepository(PersonEntity)
    private personsRepository: Repository<PersonEntity>,
  ) {}

  /** Зарегистрироваться */
  async signUpLocal(signUpDto: SignUpDto): Promise<Tokens> {
    const hash = await argon.hash(signUpDto.password);
    try {
      const existedUser = await this.personsRepository.findOne({
        where: [{ email: signUpDto.email }, { login: signUpDto.login }],
      });

      if (existedUser) {
        if (existedUser.email === signUpDto.email)
          throw new ForbiddenException('User with this email already exists');
        if (existedUser.login === signUpDto.login)
          throw new ForbiddenException(
            'User with this login already exists',
          );
      }

      const createdUser = await this.personsRepository.save({ ...signUpDto, hash });
      const tokens = await this.getTokens(createdUser.id, createdUser.email);
      await this.updateRtHash(createdUser.id, tokens.refresh_token);

      return tokens;
    } catch (error: any) {
      if (error?.code === 'P2002') {
        throw new ForbiddenException('Credentials incorrect');
      }
      throw error;
    }
  }

  /** Авторизоваться */
  async signInLocal(signInDto: SignInDto): Promise<Tokens> {
    const user = await this.personsRepository.findOne({
      where: [{ login: signInDto.loginOrEmail }, { email: signInDto.loginOrEmail }]
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(user.hash, signInDto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: number): Promise<boolean> {
    await this.personsRepository.update(
      { id: userId, hashedRt: Not(null) },
      { hashedRt: null },
    );
    return true;
  }

  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.personsRepository.findOneBy({ id: userId });
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.personsRepository.update({ id: userId }, { hashedRt: hash });
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
