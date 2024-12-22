import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  findAllByUserId(userId: string) {
    return this.categoriesRepository.findMany({
      where: { userId }
    });
  }

  findFirst(userId: string, categoryId: string) {
    return this.categoriesRepository.findFirst({
      where: { id: categoryId, userId }
    });
  }
}
