'use client';
import CategoryCard from '@/components/CategoryCard';
import React from 'react';
import {
  BugDroid,
  Camera,
  ChartBarHorizontal,
  Cpu,
  CreditCard,
  FirstAidKit,
  Handshake,
  Headphones,
  MegaphoneSimple,
  Package,
  PenNib,
  Receipt,
} from '@phosphor-icons/react';

const categories = [
  {
    id: 1,
    name: 'Label',
    coursesCount: 63476,
    icon: Cpu,
    primaryColor: 'text-secondary',
    bgColor: 'bg-secondary-100',
  },
  {
    id: 2,
    name: 'Business',
    coursesCount: 52822,
    icon: Handshake,
    primaryColor: 'text-success',
    bgColor: 'bg-success-100',
  },
  {
    id: 3,
    name: 'Finance & Accounting',
    coursesCount: 33841,
    icon: CreditCard,
    primaryColor: 'text-warning',
    bgColor: 'bg-warning-100',
  },
  {
    id: 4,
    name: 'IT & Software',
    coursesCount: 22649,
    icon: ChartBarHorizontal,
    primaryColor: 'text-error',
    bgColor: 'bg-error-100',
  },
  {
    id: 5,
    name: 'Personal Development',
    coursesCount: 20126,
    icon: BugDroid,
    primaryColor: 'text-white',
    bgColor: 'bg-white',
  },
  {
    id: 6,
    name: 'Office Productivity',
    coursesCount: 13932,
    icon: Receipt,
    primaryColor: 'text-gray-600',
    bgColor: 'bg-gray-50',
  },
  {
    id: 7,
    name: 'Marketing',
    coursesCount: 12068,
    icon: MegaphoneSimple,
    primaryColor: 'text-secondary',
    bgColor: 'bg-secondary-100',
  },
  {
    id: 8,
    name: 'Photography & Video',
    coursesCount: 6196,
    icon: Camera,
    primaryColor: 'text-gray-600',
    bgColor: 'bg-gray-50',
  },
  {
    id: 9,
    name: 'Lifestyle',
    coursesCount: 2738,
    icon: Package,
    primaryColor: 'text-warning',
    bgColor: 'bg-warning-100',
  },
  {
    id: 10,
    name: 'Design',
    coursesCount: 2800,
    icon: PenNib,
    primaryColor: 'text-error',
    bgColor: 'bg-error-100',
  },
  {
    id: 11,
    name: 'Health & Fitness',
    coursesCount: 1678,
    icon: FirstAidKit,
    primaryColor: 'text-success',
    bgColor: 'bg-success-100',
  },
  {
    id: 12,
    name: 'Music',
    coursesCount: 959,
    icon: Headphones,
    primaryColor: 'text-warning',
    bgColor: 'bg-warning-100',
  },
];

const CategorySection = () => {
  return (
    <section className="section-container container-md space-y-10 ">
      <h2 className="text-center">Browse top category</h2>

      <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </ul>
    </section>
  );
};

export default CategorySection;
