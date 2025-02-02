'use client';
import { cn } from '@/lib/utils';
import { Category } from '@/types';
import React from 'react';

const CategoryCard = ({ category }: { category: Category }) => {
  const CategoryIcon = category.icon;
  return (
    <li className={`${category.bgColor} p-5`}>
      <div className="flex items-center gap-4 max-md:flex-col lg:gap-5">
        <div
          className={cn(
            'p-4',
            category.bgColor.includes('white') ? 'bg-warning' : 'bg-white'
          )}
        >
          <CategoryIcon
            className={`size-6 lg:size-8 ${category.primaryColor}`}
          />
        </div>
        <div className="space-y-2 max-md:text-center">
          <p className="text-base font-medium text-gray-900">{category.name}</p>
          <p className="text-sm text-gray-600">
            {category.coursesCount} Courses
          </p>
        </div>
      </div>
    </li>
  );
};

export default CategoryCard;
