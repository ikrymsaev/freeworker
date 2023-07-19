import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponseDto, LoginUserDto, RefreshResponseDto, RegisterResponseDto, RegisterUserDto } from './dto';
import { GetCurrentUser, GetCurrentUserId, Public } from '@decorators/index';
import { RefreshTokenGuard } from '@guards/index';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: [RegisterUserDto] })
  @ApiResponse({ type: [RegisterResponseDto] })
  @ApiOperation({ summary: 'Регистрация' })
  async register(
    @Body() dto: RegisterUserDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<RegisterResponseDto> {
    return this.authService.registerUser(dto, response);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: [LoginUserDto] })
  @ApiResponse({ type: [LoginResponseDto] })
  @ApiOperation({ summary: 'Авторизация' })
  async login(@Body() dto: LoginUserDto, @Res({ passthrough: true }) response: Response): Promise<LoginResponseDto> {
    return this.authService.login(dto, response);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Выход' })
  async logout(@GetCurrentUserId() userId: number, @Res({ passthrough: true }) response: Response): Promise<boolean> {
    return this.authService.logout(userId, response);
  }

  @Public()
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  @ApiResponse({ type: [RefreshResponseDto] })
  @ApiOperation({ summary: 'Обновление токена' })
  async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) response: Response
  ): Promise<RefreshResponseDto> {
    return this.authService.refreshTokens(userId, refreshToken, response);
  }
}
