import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const LoadingSpinner = ({ size = 'md', className, text }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div className={cn(
        "border-2 border-app-primary/20 border-t-app-primary rounded-full animate-spin",
        sizeClasses[size]
      )} />
      {text && (
        <p className="text-sm text-app-text-light animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;