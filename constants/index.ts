// 'use client';

export const TOPBAR_LINKS = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Courses',
    href: '/courses',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
  {
    name: 'Become an instructor',
    href: '/become-an-instructor',
  },
];

// export const categories = [
//   {
//     id: 1,
//     name: 'Label',
//     coursesCount: 63476,
//     icon: Cpu, // Exemple d'icône
//   },
//   {
//     id: 2,
//     name: 'Business',
//     coursesCount: 52822,
//     icon: Handshake,
//   },
//   {
//     id: 3,
//     name: 'Finance & Accounting',
//     coursesCount: 33841,
//     icon: CreditCard,
//   },
//   {
//     id: 4,
//     name: 'IT & Software',
//     coursesCount: 22649,
//     icon: ChartBarHorizontal,
//   },
//   {
//     id: 5,
//     name: 'Personal Development',
//     coursesCount: 20126,
//     icon: BugDroid,
//   },
//   {
//     id: 6,
//     name: 'Office Productivity',
//     coursesCount: 13932,
//     icon: Receipt,
//   },
//   {
//     id: 7,
//     name: 'Marketing',
//     coursesCount: 12068,
//     icon: MegaphoneSimple,
//   },
//   {
//     id: 8,
//     name: 'Photography & Video',
//     coursesCount: 6196,
//     icon: Camera,
//   },
//   {
//     id: 9,
//     name: 'Lifestyle',
//     coursesCount: 2738,
//     icon: Package,
//   },
//   {
//     id: 10,
//     name: 'Design',
//     coursesCount: 2800,
//     icon: PenNib,
//   },
//   {
//     id: 11,
//     name: 'Health & Fitness',
//     coursesCount: 1678,
//     icon: FirstAidKit,
//   },
//   {
//     id: 12,
//     name: 'Music',
//     coursesCount: 959,
//     icon: Headphones,
//   },
// ];

export const FIELD_NAMES = {
  firstName: 'firstName',
  lastName: 'lastName',
  userName: 'username',
  email: 'email',
  password: 'password',
  confirmPassword: 'confirmPassword',
  terms: 'terms',
  title: 'title',
};

export const FIELD_TYPES = {
  firstName: 'text',
  lastName: 'text',
  userName: 'text',
  email: 'email',
  password: 'password',
  confirmPassword: 'password',
  title: 'text',
};

export const FIELD_PLACEHOLDERS = {
  firstName: 'John',
  lastName: 'Doe',
  userName: 'JohnD',
  email: 'john.doe@gmail.com',
  password: 'Create password',
  confirmPassword: 'Confirm password',
  title: 'Your tittle, proffesion or small biography',
};

export const PASSWORD_FIELDS = [
  FIELD_NAMES.password,
  FIELD_NAMES.confirmPassword,
  'currentPassword',
];

export const STUDENT_HEADER_LINKS = [
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    name: 'Courses',
    href: '/courses',
  },
  {
    name: 'Teachers',
    href: '/teachers',
  },
  {
    name: 'Message',
    href: '/message',
  },
  {
    name: 'Wishlist',
    href: '/wishlist',
  },
  {
    name: 'Purchase History',
    href: '/purchase-history',
  },
  {
    name: 'Settings',
    href: '/settings',
  },
];
