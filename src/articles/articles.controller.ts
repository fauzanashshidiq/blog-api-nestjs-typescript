import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Query('userId') userId: number, @Body() body: Partial<Article>) {
    return this.articlesService.create(Number(userId), body);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }
}
