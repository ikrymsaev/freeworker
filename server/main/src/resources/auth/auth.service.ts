import * as argon from 'argon2';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserDto, UserEntity, UserService } from '@resources/user';
import { JwtPayload, Tokens } from './types';
import { LoginResponseDto, LoginUserDto, RefreshResponseDto, RegisterResponseDto, RegisterUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private config: ConfigService
  ) {}

  async registerUser(dto: RegisterUserDto, response: Response): Promise<RegisterResponseDto> {
    const hash = await argon.hash(dto.password);
    try {
      const data = {
        ...dto,
        password: hash,
      };
      const user = await this.usersService.createUser(data);

      const { access_token, refresh_token } = await this.getTokens(user.user_id, user.login);
      /** Обновить refresh_token в БД. */
      const hashedRefreshToken = await argon.hash(refresh_token);
      await this.usersService.updateRtHash(user.user_id, hashedRefreshToken);

      response.cookie('refresh_token', refresh_token, {
        httpOnly: true,
      });

      return {
        access_token,
        user,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials incorrect');
      }
      throw error;
    }
  }

  /** Авторизация. */
  async login(dto: LoginUserDto, response: Response): Promise<LoginResponseDto> {
    const user = await this.validateUser(dto);

    const { access_token, refresh_token } = await this.getTokens(user.user_id, user.login);
    /** Обновить refresh_token в БД. */
    const hashedRefreshToken = await argon.hash(refresh_token);
    await this.usersService.updateRtHash(user.user_id, hashedRefreshToken);

    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
    });

    return {
      access_token,
      user,
    };
  }

  /** Разлогинить пользователя. */
  async logout(userId: number, response: Response): Promise<boolean> {
    await this.usersService.clearRefreshToken(userId);
    response.clearCookie('refresh_token');

    return true;
  }

  async refreshTokens(
    user_id: UserEntity['user_id'],
    refresh_token: string,
    response: Response
  ): Promise<RefreshResponseDto> {
    const userWithToken = await this.usersService.getUserWithRefreshToken(user_id);
    const { hashedRt } = userWithToken;
    const rtMatches = await argon.verify(hashedRt, refresh_token);
    if (!rtMatches) throw new ForbiddenException('Доступ запрещён');

    const tokens = await this.getTokens(userWithToken.user_id, userWithToken.login);
    const hashedRefreshToken = await argon.hash(tokens.refresh_token);

    await this.usersService.updateRtHash(user_id, hashedRefreshToken);
    response.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
    });

    return {
      access_token: tokens.access_token,
    };
  }

  private async validateUser(dto: LoginUserDto): Promise<UserDto> {
    const user = await this.usersService.getUserWithPassword(dto.login);
    if (!user) {
      throw new ForbiddenException('Неверный логин или пароль');
    }
    let passwordMatches: boolean;
    /** Если пользователь тестовый, его пароль не захеширован. */
    if (user.is_test) {
      passwordMatches = user.password === dto.password;
    } else {
      passwordMatches = await argon.verify(user.password, dto.password);
    }

    if (!passwordMatches) throw new ForbiddenException('Неверный логин или пароль');

    const userDto = {
      user_id: user.user_id,
      login: user.login,
      email: user.email,
      phone: user.phone,
      first_name: user.first_name,
      last_name: user.last_name,
      register_date: user.register_date,
    };

    return userDto;
  }

  private async getTokens(userId: number, login: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      login: login,
    };

    const [access_token, refresh_token] = await Promise.all([
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
      access_token,
      refresh_token,
    };
  }
}
