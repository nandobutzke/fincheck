import { Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { UsersService } from './users.service';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  me(@ActiveUserId() userId: string) {
    return this.usersService.getUserById(userId);
  }
}
