// import { Course } from "@prisma/client";

// export const validateForPublishing = (course: Course) => {
//   const requiredFields = {
//     // Basic Information
//     title: 'Title is required',
//     subtitle: 'Subtitle is required',
//     categoryId: 'Category is required',
//     topic: 'Topic is required',
//     languageId: 'Language is required',
//     level: 'Course level is required',
//     duration: 'Duration is required',
//     durationUnit: 'Duration unit is required',

//     // Advanced Information
//     thumbnail: 'Thumbnail is required',
//     trailer: 'Trailer is required',
//     description: 'Description is required',
//     welcomeMessage: 'Welcome message is required',
//     congratulationsMessage: 'Congratulations message is required',
//   };

//   const errors: Record<string, string> = {};

//   // Check each required field
//   Object.entries(requiredFields).forEach(([field, message]) => {
//     if (!course[field]) {
//       errors[field] = message;
//     }
//   });

//   // Check if curriculum exists
//   if (!course.sections || course.sections.length === 0) {
//     errors.curriculum = 'Course must have at least one section';
//   }

//   return {
//     isValid: Object.keys(errors).length === 0,
//     errors,
//   };
// };
