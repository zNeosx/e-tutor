import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Categories
  const categories = [
    { name: 'Development', icon: '💻', color: '#007bff' },
    { name: 'Business', icon: '💼', color: '#28a745' },
    { name: 'Design', icon: '🎨', color: '#6f42c1' },
    { name: 'Marketing', icon: '📈', color: '#fd7e14' },
    { name: 'Music', icon: '🎵', color: '#e83e8c' },
    { name: 'Health & Fitness', icon: '💪', color: '#20c997' },
    { name: 'Photography', icon: '📸', color: '#6c757d' },
    { name: 'Personal Development', icon: '🎯', color: '#17a2b8' }
  ];

  // Create Languages
  const languages = [
    { name: 'English', code: 'en', flag: '🇬🇧' },
    { name: 'French', code: 'fr', flag: '🇫🇷' },
    { name: 'Spanish', code: 'es', flag: '🇪🇸' },
    { name: 'German', code: 'de', flag: '🇩🇪' },
    { name: 'Arabic', code: 'ar', flag: '🇸🇦' }
  ];

  console.log('Start seeding...');

  // Seed Categories
  for (const category of categories) {
    await prisma.category.create({
      data: category
    });
  }
  console.log('Categories seeded successfully');

  // Seed Languages
  for (const language of languages) {
    await prisma.language.create({
      data: language
    });
  }
  console.log('Languages seeded successfully');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
