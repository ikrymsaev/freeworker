import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { Tokens } from './types';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Зарегистрироваться' })

  @Public()
  @Post('local/signup')
  async signUpLocal(
    @Body() dto: SignUpDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Tokens> {
    const tokens = await this.authService.signUpLocal(dto);
    if (tokens) {
      response.cookie('refresh_token', tokens.refresh_token);
      return tokens;
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Залогиниться' })

  @Public()
  @Post('local/signin')
  async signInLocal(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Tokens> {
    const tokens = await this.authService.signInLocal(dto);
    if (tokens) {
      response.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
      });
      return tokens;
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Выйти' })

  @Public()
  @Post('logout')
  async logout(
    @GetCurrentUserId() userId: number,
    @Res({ passthrough: true }) response: Response,
  ): Promise<boolean> {
    const result = await this.authService.logout(userId);
    if (result) {
      response.clearCookie('refresh_token');
    }
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Обновить токен' })

  @Public()
  @UseGuards(RtGuard)
  @Get('refresh')
  async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Tokens> {
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    if (tokens) {
      response.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
      });
    }
    return tokens;
  }
}
