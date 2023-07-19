import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId, Public } from '@decorators/index';
import { BadRequestException, Controller, Get, HttpCode, HttpStatus, Inject, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { TestUserDto, UserDto } from './dto';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: [UserDto] })
  @ApiOperation({ summary: 'Получить всех пользователей' })
  getAll(): Promise<UserDto[]> {
    return this.userService.getAll();
  }

  @Public()
  @Get('/test_users')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: [TestUserDto] })
  @ApiOperation({ summary: 'Получить всех пользователей' })
  getAllTestUsers(): Promise<TestUserDto[]> {
    return this.userService.getAllTestUsers();
  }

  @Get('/current')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: [UserDto] })
  @ApiOperation({ summary: 'Получить текущего пользователя' })
  getCurrentuser(@GetCurrentUserId() userId: number): Promise<UserDto> {
    const id = Number(userId);
    if (!id) throw new BadRequestException('getCurrentuser, GetCurrentUserId');

    return this.userService.getUserById(userId);
  }

  @Get('/user_id/:user_id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: [UserDto] })
  @ApiOperation({ summary: 'Получить пользователя по id' })
  getUserByid(@Param() params: { user_id: string }): Promise<UserDto> {
    const id = Number(params.user_id);
    if (!id) throw new BadRequestException('Невалидный id пользователя');

    return this.userService.getUserById(Number(params.user_id));
  }
}
