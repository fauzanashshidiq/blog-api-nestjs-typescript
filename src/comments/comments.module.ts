import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { User } from '../users/user.entity';
import { Article } from '../articles/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Article])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
