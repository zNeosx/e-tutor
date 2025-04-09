import { CategoryRepository } from '@/src/infrastructure/repositories/category.repository';
import { NextResponse } from 'next/server';

const categoryRepository = new CategoryRepository();

export const GET = async () => {
  const categories = await categoryRepository.getAll();
  return NextResponse.json(categories);
};
