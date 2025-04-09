// import { relations } from 'drizzle-orm';
// import {
//   boolean,
//   integer,
//   pgEnum,
//   pgTable,
//   text,
//   timestamp,
//   uuid,
// } from 'drizzle-orm/pg-core';

// // Enums
// export const userRoleEnum = pgEnum('user_role', [
//   'ADMIN',
//   'STUDENT',
//   'INSTRUCTOR',
// ]);
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

// // Tables
// export const usersTable = pgTable('users', {
//   id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
//   firstName: text('first_name').notNull(),
//   lastName: text('last_name').notNull(),
//   userName: text('user_name').unique().notNull(),
//   email: text('email').unique().notNull(),
//   emailVerified: timestamp('email_verified'),
//   password: text('password').notNull(),
//   role: userRoleEnum('role').default('STUDENT').notNull(),
//   avatar: text('avatar'),
//   title: text('title'),
//   biography: text('biography'),
//   phoneNumber: text('phone_number'),
//   isProfileCompleted: boolean('is_profile_completed').default(false),
//   resetPasswordToken: text('reset_password_token').unique(),
//   resetPasswordExpires: timestamp('reset_password_expires'),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
//   updatedAt: timestamp('updated_at').defaultNow().notNull(),
//   lastSigned: timestamp('last_signed'),
// });

// // export const socialLinks = pgTable('social_links', {
// //   id: text('id').primaryKey().notNull(),
// //   userId: text('user_id')
// //     .unique()
// //     .notNull()
// //     .references(() => users.id),
// //   website: text('website'),
// //   facebook: text('facebook'),
// //   instagram: text('instagram'),
// //   linkedin: text('linkedin'),
// //   twitter: text('twitter'),
// //   whatsapp: text('whatsapp'),
// //   youtube: text('youtube'),
// //   github: text('github'),
// // });

// export const categoriesTable = pgTable('categories', {
//   id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
//   name: text('name').unique().notNull(),
//   icon: text('icon').notNull(),
//   color: text('color').notNull(),
// });

// export const courses = pgTable('courses', {
//   id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
//   status: courseStatusEnum('status').default('DRAFT').notNull(),

//   // Basic Information
//   title: text('title'),
//   subtitle: text('subtitle'),
//   categoryId: uuid('category_id').references(() => categoriesTable.id),
//   subCategoryId: uuid('sub_category_id').references(() => categoriesTable.id),
//   topic: text('topic'),
//   languageId: uuid('language_id').references(() => languagesTable.id),
//   subLanguageId: uuid('sub_language_id').references(() => languagesTable.id),
//   level: courseLevelEnum('level'),
//   duration: integer('duration'),
//   durationUnit: durationUnitEnum('duration_unit'),
//   basicInformationCompleted: boolean('basic_information_completed')
//     .default(false)
//     .notNull(),

//   // Advanced Information
//   // thumbnail: text('thumbnail'),
//   // trailer: text('trailer'),
//   // description: text('description'),
//   // whatYouWillLearn: text('what_you_will_learn').array(),
//   // targetAudience: text('target_audience').array(),
//   // requirements: text('requirements').array(),
//   // welcomeMessage: text('welcome_message'),
//   // congratulationsMessage: text('congratulations_message'),
//   // price: integer('price'),
//   // currency: text('currency').default('USD'),
//   // advanceInformationCompleted: boolean('advance_information_completed')
//   //   .default(false)
//   //   .notNull(),

//   // // Curriculum
//   // curriculumCompleted: boolean('curriculum_completed').default(false).notNull(),

//   // Metadata
//   createdAt: timestamp('created_at').defaultNow().notNull(),
//   updatedAt: timestamp('updated_at').defaultNow().notNull(),
//   userId: uuid('user_id')
//     .notNull()
//     .references(() => usersTable.id),
// });

// export const languagesTable = pgTable('languages', {
//   id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
//   name: text('name').unique().notNull(),
//   code: text('code').unique().notNull(),
//   flag: text('flag').notNull(),
// });

// // export const courseSectionsTable = pgTable('course_sections', {
// //   id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
// //   name: text('name').notNull(),
// //   courseId: text('course_id')
// //     .notNull()
// //     .references(() => courses.id),
// // });

// // export const courseContentsTable = pgTable('course_contents', {
// //   id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
// //   sectionId: text('section_id')
// //     .notNull()
// //     .references(() => courseSectionsTable.id),
// //   video: text('video'),
// //   file: text('file'),
// //   quote: text('quote'),
// //   description: text('description'),
// // });

// // export const lectureNotesTable = pgTable('lecture_notes', {
// //   id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
// //   contentId: text('content_id')
// //     .unique()
// //     .notNull()
// //     .references(() => courseContentsTable.id),
// //   text: text('text').notNull(),
// //   file: text('file'),
// // });

// // export const reviews = pgTable('reviews', {
// //   id: integer('id').primaryKey(),
// //   courseId: text('course_id')
// //     .notNull()
// //     .references(() => courses.id),
// //   userId: text('user_id')
// //     .notNull()
// //     .references(() => users.id),
// //   rating: integer('rating').notNull(),
// //   comment: text('comment').notNull(),
// //   createdAt: timestamp('created_at').defaultNow().notNull(),
// // });

// // // Relations
// // export const usersRelations = relations(users, ({ one, many }) => ({
// //   instructor: one(instructors, {
// //     fields: [users.id],
// //     references: [instructors.userId],
// //   }),
// //   socialLinks: one(socialLinks, {
// //     fields: [users.id],
// //     references: [socialLinks.userId],
// //   }),
// //   coursesTaught: many(courses),
// //   reviews: many(reviews),
// // }));

// export const coursesRelations = relations(courses, ({ one }) => ({
//   category: one(categoriesTable, {
//     fields: [courses.categoryId],
//     references: [categoriesTable.id],
//   }),
//   subCategory: one(categoriesTable, {
//     fields: [courses.subCategoryId],
//     references: [categoriesTable.id],
//   }),
//   language: one(languagesTable, {
//     fields: [courses.languageId],
//     references: [languagesTable.id],
//   }),
//   subLanguage: one(languagesTable, {
//     fields: [courses.subLanguageId],
//     references: [languagesTable.id],
//   }),
//   user: one(usersTable, {
//     fields: [courses.userId],
//     references: [usersTable.id],
//   }),
//   // sections: many(courseSectionsTable),
//   // reviews: many(reviews),
// }));

// // export const courseSectionsRelations = relations(
// //   courseSectionsTable,
// //   ({ one, many }) => ({
// //     course: one(courses, {
// //       fields: [courseSectionsTable.courseId],
// //       references: [courses.id],
// //     }),
// //     contents: many(courseContentsTable),
// //   })
// // );

// // export const courseContentsRelations = relations(
// //   courseContentsTable,
// //   ({ one }) => ({
// //     section: one(courseSectionsTable, {
// //       fields: [courseContentsTable.sectionId],
// //       references: [courseSectionsTable.id],
// //     }),
// //     lectureNote: one(lectureNotesTable, {
// //       fields: [courseContentsTable.id],
// //       references: [lectureNotesTable.contentId],
// //     }),
// //   })
// // );
