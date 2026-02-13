import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: Partial<User>) {
    return this.usersService.create(body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() body: any) {
    const userIdFromToken = req.user.userId;
    const userIdFromParam = +id;

    if (userIdFromToken !== userIdFromParam) {
      throw new ForbiddenException('You can only update your own account');
    }

    return this.usersService.update(userIdFromParam, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    const userIdFromToken = req.user.userId;
    const userIdFromParam = +id;

    if (userIdFromToken !== userIdFromParam) {
      throw new ForbiddenException('You can only delete your own account');
    }

    return this.usersService.remove(userIdFromParam);
  }
}
