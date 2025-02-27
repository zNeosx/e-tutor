'use client';
import { cn } from '@/lib/utils';
import {
  CircleWavyCheck,
  GlobeHemisphereWest,
  Notebook,
  Stack,
  Users,
} from '@phosphor-icons/react';
import React from 'react';

const stats = [
  {
    label: 'Students',
    number: '67.1k',
    icon: Users,
    color: 'text-primary',
  },
  {
    label: 'Certified Instructor',
    number: '26k',
    icon: Notebook,
    color: 'text-secondary',
  },
  {
    label: 'Country Language',
    number: '72',
    icon: GlobeHemisphereWest,
    color: 'text-error',
  },
  {
    label: 'Success Rate',
    number: '99,9%',
    icon: CircleWavyCheck,
    color: 'text-success',
  },
  {
    label: 'Trusted Companies',
    number: '57',
    icon: Stack,
    color: 'text-warning',
  },
];

const BAIStatsSection = () => {
  return (
    <section className="bg-primary-100 py-10">
      <div className="container-md">
        <ul className="flex items-center justify-center max-lg:gap-4 max-sm:grid max-sm:flex-col sm:flex-wrap">
          {stats.map((stat, index) => (
            <li key={index} className="flex items-start gap-4">
              <stat.icon className={cn('size-10', stat.color)} />
              <div className="flex flex-col gap-2">
                <h3 className="">{stat.number}</h3>
                <p className="text-sm text-gray-700">{stat.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BAIStatsSection;
