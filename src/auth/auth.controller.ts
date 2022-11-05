import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/create-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'test',
          description:
            'Username required , must be at least 4 characters long and at most 20 characters long',
        },
        password: {
          type: 'string',
          example: '@Test1234',
          description:
            'Password required , must be at least 8 characters long and at most 20 characters long and must contain at least one uppercase letter, one lowercase letter, one number or special character',
        },
      },
    },
  })
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'test',
          description:
            'Username required , must be at least 4 characters long and at most 20 characters long',
        },
        password: {
          type: 'string',
          example: '@Test1234',
          description:
            'Password required , must be at least 8 characters long and at most 20 characters long and must contain at least one uppercase letter, one lowercase letter, one number or special character',
        },
      },
    },
  })
  @UsePipes(ValidationPipe)
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialsDto);
  }
}
