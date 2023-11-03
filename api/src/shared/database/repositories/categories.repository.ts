import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { type Prisma } from "@prisma/client";

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(findManyCategoriesDto: Prisma.CategoryFindManyArgs) {
    return this.prismaService.category.findMany(findManyCategoriesDto);
  }

  findFirst(findFirstCategoriesDto: Prisma.CategoryFindFirstArgs) {
    return this.prismaService.category.findFirst(findFirstCategoriesDto);
  }
}
