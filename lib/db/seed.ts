// import { db } from './index';
// import { categories, languages } from './schema';
// import { v4 as uuidv4 } from 'uuid';

// async function main() {
//   const categoriesData = [
//     { name: 'Development', icon: '💻', color: '#007bff' },
//     { name: 'Business', icon: '💼', color: '#28a745' },
//     { name: 'Design', icon: '🎨', color: '#6f42c1' },
//     { name: 'Marketing', icon: '📈', color: '#fd7e14' },
//     { name: 'Music', icon: '🎵', color: '#e83e8c' },
//     { name: 'Health & Fitness', icon: '💪', color: '#20c997' },
//     { name: 'Photography', icon: '📸', color: '#6c757d' },
//     { name: 'Personal Development', icon: '🎯', color: '#17a2b8' },
//   ];

//   const languagesData = [
//     { name: 'English', code: 'en', flag: '🇬🇧' },
//     { name: 'French', code: 'fr', flag: '🇫🇷' },
//     { name: 'Spanish', code: 'es', flag: '🇪🇸' },
//     { name: 'German', code: 'de', flag: '🇩🇪' },
//     { name: 'Arabic', code: 'ar', flag: '🇸🇦' },
//   ];

//   console.log('Start seeding...');

//   try {
//     // Seed Categories
//     for (const category of categoriesData) {
//       await db.insert(categories).values({
//         id: uuidv4(),
//         name: category.name,
//         icon: category.icon,
//         color: category.color,
//       });
//     }
//     console.log('Categories seeded successfully');

//     // Seed Languages
//     for (const language of languagesData) {
//       await db.insert(languages).values({
//         id: uuidv4(),
//         name: language.name,
//         code: language.code,
//         flag: language.flag,
//       });
//     }
//     console.log('Languages seeded successfully');

//     console.log('Seeding finished.');
//   } catch (error) {
//     console.error('Error seeding database:', error);
//     process.exit(1);
//   }
// }

// main().catch((e) => {
//   console.error(e);
//   process.exit(1);
// });
