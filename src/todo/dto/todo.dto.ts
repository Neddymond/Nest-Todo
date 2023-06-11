import { Todo } from '@prisma/client';
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateTodoDto {
  @IsDefined({ message: 'title is required' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class SearchTodoDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  page?: number;

  @IsNumber()
  @Min(0)
  perPage?: number;
}

export class QueryDto {
  @IsNumber()
  @Min(0)
  page?: number;

  @IsNumber()
  @Min(0)
  perPage?: number;
}

export interface PaginatedResult {
  todos: Todo[];
  meta: {
    total: number;
    currentPage: number;
    perPage: number;
  };
}
