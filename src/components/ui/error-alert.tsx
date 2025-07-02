import React from 'react';

import { AlertTriangle, X } from 'lucide-react';

import { Button } from './button';

interface ErrorAlertProps {
  title?: string;
  message: string;
  onDismiss?: () => void;
  className?: string;
  variant?: 'error' | 'warning';
}

export function ErrorAlert({ 
  title = '오류 발생', 
  message, 
  onDismiss, 
  className = '',
  variant = 'error'
}: ErrorAlertProps) {
  const isError = variant === 'error';
  
  return (
    <div className={`rounded-lg border p-4 ${
      isError 
        ? 'border-red-200 bg-red-50' 
        : 'border-yellow-200 bg-yellow-50'
    } ${className}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
          isError ? 'text-red-500' : 'text-yellow-500'
        }`} />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <h4 className={`text-sm font-medium mb-1 ${
                isError ? 'text-red-800' : 'text-yellow-800'
              }`}>
                {title}
              </h4>
              <p className={`text-sm ${
                isError ? 'text-red-700' : 'text-yellow-700'
              }`}>
                {message}
              </p>
            </div>
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={onDismiss}
                aria-label="오류 메시지 닫기"
              >
                <X className={`h-4 w-4 ${
                  isError ? 'text-red-500' : 'text-yellow-500'
                }`} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}