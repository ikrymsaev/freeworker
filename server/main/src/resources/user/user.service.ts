import { Not, Repository } from 'typeorm';
import { CityService } from '@resources/city';
import { RegisterUserDto } from '@resources/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserEntity } from './entities';
import { TestUserDto, UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly cityService: CityService
  ) {}

  getAll(): Promise<UserDto[]> {
    return this.userRepository.find();
  }

  async getUserById(user_id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { user_id },
    });
    if (!user) throw new ForbiddenException('Пользователя с таким id нет');
    const { hashedRt, password, ...userDto } = user;

    return userDto;
  }

  getAllTestUsers(): Promise<TestUserDto[]> {
    return this.userRepository.find({
      where: { is_test: true },
      select: {
        user_id: true,
        login: true,
        password: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
      },
    });
  }

  async createUser(registerUserInput: RegisterUserDto): Promise<UserDto> {
    const isCityExist = await this.cityService.isCityExist(registerUserInput.city_id);
    if (!isCityExist) throw new ForbiddenException('Такой город не существует');

    const existedUser = await this.userRepository.findOne({
      where: [{ login: registerUserInput.login }],
    });
    if (existedUser) {
      if (existedUser.login === registerUserInput.login)
        throw new ForbiddenException('Пользователь с таким логином уже есть');
    }

    const data = this.userRepository.create(registerUserInput);
    const user = await this.userRepository.save(data);

    return user;
  }

  /** Найти пользователя по логину */
  async getUserByLogin(login: UserDto['login']): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { login },
    });
    if (!user) throw new ForbiddenException('Пользователя с таким логином нет');

    return user;
  }

  /** Получить пользователя с паролем. */
  async getUserWithPassword(login: UserDto['login']): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { login },
    });
    if (!user) throw new ForbiddenException('Пользователя с таким логином нет');

    return user;
  }

  /** Получить рефреш токен пользователя. */
  async getUserWithRefreshToken(
    user_id: UserEntity['user_id']
  ): Promise<Pick<UserEntity, 'user_id' | 'login' | 'hashedRt'>> {
    const user = await this.userRepository.findOne({
      where: { user_id },
      select: { user_id: true, login: true, hashedRt: true },
    });
    if (!user) throw new ForbiddenException('Finded user is not exists');
    if (!user.hashedRt) throw new ForbiddenException('Refresh token is missing');

    return user;
  }

  /** Обновить рефреш токен пользователя. */
  async updateRtHash(user_id: number, hash: string): Promise<void> {
    await this.userRepository.update({ user_id }, { hashedRt: hash });
  }

  /** Очистить рефреш токен пользователя. */
  async clearRefreshToken(user_id: number) {
    await this.userRepository.update({ user_id, hashedRt: Not('') }, { hashedRt: '' });

    return true;
  }
}
