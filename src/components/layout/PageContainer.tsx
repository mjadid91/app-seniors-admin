import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  actions?: React.ReactNode;
}

const PageContainer = ({ 
  children, 
  className, 
  title, 
  description, 
  icon: Icon, 
  actions 
}: PageContainerProps) => {
  return (
    <div className="page-container">
      <div className={cn("page-content", className)}>
        {(title || description) && (
          <div className="mb-8 p-6 bg-gradient-subtle rounded-xl border-elegant animate-fade-in-down">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                {Icon && (
                  <div className="w-12 h-12 bg-gradient-to-br from-app-primary/20 to-app-secondary/20 rounded-xl flex items-center justify-center">
                    <Icon className="h-6 w-6 text-app-primary" />
                  </div>
                )}
                <div className="space-y-1">
                  {title && (
                    <h1 className="text-2xl font-semibold text-app-text">
                      {title}
                    </h1>
                  )}
                  {description && (
                    <p className="text-app-text-light">
                      {description}
                    </p>
                  )}
                </div>
              </div>
              {actions && (
                <div className="flex items-center gap-3">
                  {actions}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageContainer;