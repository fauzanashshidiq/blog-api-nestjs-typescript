import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../users/user.entity';
import { Article } from '../articles/article.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async create(userId: number, articleId: number, content: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const article = await this.articleRepository.findOneBy({ id: articleId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const comment = this.commentRepository.create({
      content,
      user,
      article,
    });

    return this.commentRepository.save(comment);
  }

  async findByArticle(articleId: number) {
    return this.commentRepository.find({
      where: { article: { id: articleId } },
      relations: ['user'],
    });
  }

  async remove(userId: number, commentId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });

    if (!comment) throw new NotFoundException('Comment not found');

    if (comment.user.id !== userId) {
      throw new ForbiddenException('You cannot delete this comment');
    }

    await this.commentRepository.remove(comment);

    return { message: 'Comment deleted' };
  }
}
