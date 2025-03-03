import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

// Enums
export const userRoleEnum = pgEnum('user_role', [
  'ADMIN',
  'STUDENT',
  'INSTRUCTOR',
]);
// export const courseStatusEnum = pgEnum('course_status', ['DRAFT', 'PUBLISHED']);
// export const courseLevelEnum = pgEnum('course_level', [
//   'BEGINNER',
//   'INTERMEDIATE',
//   'ADVANCED',
// ]);
// export const durationUnitEnum = pgEnum('duration_unit', [
//   'DAYS',
//   'MONTHS',
//   'YEARS',
// ]);

// Tables
export const usersTable = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  userName: text('user_name').unique().notNull(),
  email: text('email').unique().notNull(),
  emailVerified: timestamp('email_verified'),
  password: text('password').notNull(),
  role: userRoleEnum('role').default('STUDENT').notNull(),
  avatar: text('avatar'),
  title: text('title'),
  isProfileCompleted: boolean('is_profile_completed').default(false),
  resetPasswordToken: text('reset_password_token').unique(),
  resetPasswordExpires: timestamp('reset_password_expires'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  lastSigned: timestamp('last_signed'),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export const instructorsTable = pgTable('instructors', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  biography: text('biography'),
  phoneNumber: text('phone_number'),
  userId: uuid('user_id')
    .unique()
    .notNull()
    .references(() => usersTable.id),
});

export type InsertInstructor = typeof instructorsTable.$inferInsert;
export type SelectInstructor = typeof instructorsTable.$inferSelect;

// export const socialLinks = pgTable('social_links', {
//   id: text('id').primaryKey().notNull(),
//   userId: text('user_id')
//     .unique()
//     .notNull()
//     .references(() => users.id),
//   website: text('website'),
//   facebook: text('facebook'),
//   instagram: text('instagram'),
//   linkedin: text('linkedin'),
//   twitter: text('twitter'),
//   whatsapp: text('whatsapp'),
//   youtube: text('youtube'),
//   github: text('github'),
// });

// export const categories = pgTable('categories', {
//   id: text('id').primaryKey().notNull(),
//   name: text('name').unique().notNull(),
//   icon: text('icon').notNull(),
//   color: text('color').notNull(),
// });

// export const courses = pgTable('courses', {
//   id: text('id').primaryKey().notNull(),
//   status: courseStatusEnum('status').default('DRAFT').notNull(),

//   // Basic Information
//   title: text('title'),
//   subtitle: text('subtitle'),
//   categoryId: text('category_id').references(() => categories.id),
//   subCategoryId: text('sub_category_id').references(() => categories.id),
//   topic: text('topic'),
//   languageId: text('language_id').references(() => languages.id),
//   subLanguageId: text('sub_language_id').references(() => languages.id),
//   level: courseLevelEnum('level'),
//   duration: integer('duration'),
//   durationUnit: durationUnitEnum('duration_unit'),
//   basicInformationCompleted: boolean('basic_information_completed')
//     .default(false)
//     .notNull(),

//   // Advanced Information
//   thumbnail: text('thumbnail'),
//   trailer: text('trailer'),
//   description: text('description'),
//   whatYouWillLearn: text('what_you_will_learn').array(),
//   targetAudience: text('target_audience').array(),
//   requirements: text('requirements').array(),
//   welcomeMessage: text('welcome_message'),
//   congratulationsMessage: text('congratulations_message'),
//   price: integer('price'),
//   currency: text('currency').default('USD'),
//   advanceInformationCompleted: boolean('advance_information_completed')
//     .default(false)
//     .notNull(),

//   // Curriculum
//   curriculumCompleted: boolean('curriculum_completed').default(false).notNull(),

//   // Metadata
//   createdAt: timestamp('created_at').defaultNow().notNull(),
//   updatedAt: timestamp('updated_at').defaultNow().notNull(),
//   userId: text('user_id')
//     .notNull()
//     .references(() => users.id),
// });

// export const languages = pgTable('languages', {
//   id: text('id').primaryKey().notNull(),
//   name: text('name').unique().notNull(),
//   code: text('code').unique().notNull(),
//   flag: text('flag').notNull(),
// });

// export const courseSections = pgTable('course_sections', {
//   id: text('id').primaryKey().notNull(),
//   name: text('name').notNull(),
//   courseId: text('course_id')
//     .notNull()
//     .references(() => courses.id),
// });

// export const courseContents = pgTable('course_contents', {
//   id: text('id').primaryKey().notNull(),
//   sectionId: text('section_id')
//     .notNull()
//     .references(() => courseSections.id),
//   video: text('video'),
//   file: text('file'),
//   quote: text('quote'),
//   description: text('description'),
// });

// export const lectureNotes = pgTable('lecture_notes', {
//   id: text('id').primaryKey().notNull(),
//   contentId: text('content_id')
//     .unique()
//     .notNull()
//     .references(() => courseContents.id),
//   text: text('text').notNull(),
//   file: text('file'),
// });

// export const reviews = pgTable('reviews', {
//   id: integer('id').primaryKey(),
//   courseId: text('course_id')
//     .notNull()
//     .references(() => courses.id),
//   userId: text('user_id')
//     .notNull()
//     .references(() => users.id),
//   rating: integer('rating').notNull(),
//   comment: text('comment').notNull(),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
// });

// // Relations
// export const usersRelations = relations(users, ({ one, many }) => ({
//   instructor: one(instructors, {
//     fields: [users.id],
//     references: [instructors.userId],
//   }),
//   socialLinks: one(socialLinks, {
//     fields: [users.id],
//     references: [socialLinks.userId],
//   }),
//   coursesTaught: many(courses),
//   reviews: many(reviews),
// }));

// export const coursesRelations = relations(courses, ({ one, many }) => ({
//   category: one(categories, {
//     fields: [courses.categoryId],
//     references: [categories.id],
//   }),
//   subCategory: one(categories, {
//     fields: [courses.subCategoryId],
//     references: [categories.id],
//   }),
//   language: one(languages, {
//     fields: [courses.languageId],
//     references: [languages.id],
//   }),
//   subLanguage: one(languages, {
//     fields: [courses.subLanguageId],
//     references: [languages.id],
//   }),
//   user: one(users, {
//     fields: [courses.userId],
//     references: [users.id],
//   }),
//   sections: many(courseSections),
//   reviews: many(reviews),
// }));

// export const courseSectionsRelations = relations(
//   courseSections,
//   ({ one, many }) => ({
//     course: one(courses, {
//       fields: [courseSections.courseId],
//       references: [courses.id],
//     }),
//     contents: many(courseContents),
//   })
// );

// export const courseContentsRelations = relations(courseContents, ({ one }) => ({
//   section: one(courseSections, {
//     fields: [courseContents.sectionId],
//     references: [courseSections.id],
//   }),
//   lectureNote: one(lectureNotes, {
//     fields: [courseContents.id],
//     references: [lectureNotes.contentId],
//   }),
// }));
