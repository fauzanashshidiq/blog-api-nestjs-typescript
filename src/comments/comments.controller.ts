import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':articleId')
  create(
    @Req() req,
    @Param('articleId') articleId: string,
    @Body('content') content: string,
  ) {
    const userId = req.user.userId;
    return this.commentsService.create(userId, +articleId, content);
  }

  @Get(':articleId')
  findByArticle(@Param('articleId') articleId: string) {
    return this.commentsService.findByArticle(+articleId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.commentsService.remove(userId, +id);
  }
}
