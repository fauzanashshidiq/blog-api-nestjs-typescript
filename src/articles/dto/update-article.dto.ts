import { IsOptional } from 'class-validator';

export class UpdateArticleDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  content?: string;
}
