import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() body: any) {
    const userId = req.user.userId;
    return this.articlesService.create(userId, body);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() body: any) {
    const userId = req.user.userId;
    return this.articlesService.update(userId, +id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.articlesService.remove(userId, +id);
  }
}
