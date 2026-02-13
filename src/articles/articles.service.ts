import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: number, data: Partial<Article>) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const article = this.articleRepository.create({
      ...data,
      user,
    });

    return this.articleRepository.save(article);
  }

  async findAll() {
    return this.articleRepository.find({ relations: ['user'] });
  }

  async update(userId: number, articleId: number, data: Partial<Article>) {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
      relations: ['user'],
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.user.id !== userId) {
      throw new ForbiddenException('You cannot edit this article');
    }

    Object.assign(article, data);

    return this.articleRepository.save(article);
  }

  async remove(userId: number, articleId: number) {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
      relations: ['user'],
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.user.id !== userId) {
      throw new ForbiddenException('You cannot delete this article');
    }

    await this.articleRepository.remove(article);

    return { message: 'Article deleted successfully' };
  }
}
