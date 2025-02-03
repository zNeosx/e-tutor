import React from 'react';

export const CheckCircleIcon = ({
  width = 24,
  height = 24,
  fill = '#23BD33',
  strokeWidth = 1.5,
}: {
  width?: number;
  height?: number;
  fill?: string;
  strokeWidth?: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        fill={fill}
        stroke="currentColor"
        strokeWidth={`${strokeWidth}`}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.125 9.75L10.625 15L7.875 12.375"
        stroke="white"
        strokeWidth={`${strokeWidth}`}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
