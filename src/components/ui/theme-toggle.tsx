import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  variant = 'ghost',
  size = 'icon',
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={cn('relative overflow-hidden', className)}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun
          className={cn(
            'absolute inset-0 h-5 w-5 rotate-0 scale-100 transition-all duration-500',
            theme === 'dark' && 'rotate-90 scale-0'
          )}
        />
        <Moon
          className={cn(
            'absolute inset-0 h-5 w-5 rotate-90 scale-0 transition-all duration-500',
            theme === 'dark' && 'rotate-0 scale-100'
          )}
        />
      </div>
    </Button>
  );
};

