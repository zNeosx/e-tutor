import { LanguageRepository } from '@/src/infrastructure/repositories/language.repository';
import { NextResponse } from 'next/server';

const languageRepository = new LanguageRepository();

export const GET = async () => {
  const languages = await languageRepository.getAll();
  return NextResponse.json(languages);
};
