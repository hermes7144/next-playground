import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { forwardRef } from 'react';
import { Button as ShadcnUIButton, buttonVariants } from '@/components/ui/button';
import { cn } from "@/lib/utils"; 
import { Check, X, Save, Trash2, Pencil, Search } from 'lucide-react';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants>
  {
    icon?: React.ReactNode;
    iconPlacement?: 'left' | 'right';
    asChild?: boolean;
    preset?: 'confirm' | 'cancel' | 'edit' | 'delete' | 'save' | 'search'
  }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    size,
    variant,
    fontWeight,
    preset,
    icon,
    iconPlacement = 'left',
    children,
    asChild = false,
    ...props
  }, ref) => {
    switch (preset) {
      case 'confirm':
        variant = "green";
        icon = icon === undefined ? <Check /> : icon;
        break;
      case 'cancel':
        variant = "yellow-text";
        icon = icon === undefined ? <X /> : icon;
        break;
      case 'edit':
        variant = "blue-text";
        icon = icon === undefined ? <Pencil /> : icon;
        break;
      case 'delete':
        variant = "red-text";
        icon = icon === undefined ? <Trash2 /> : icon;
        break;
      case 'save':
        variant = "green-text";
        icon = icon === undefined ? <Save /> : icon;
        break;
      case 'search':
        variant = "black";
        icon = icon === undefined ? <Search /> : icon;
        break;
    }
    
    const content = (
      <>
        {(iconPlacement === 'left' && icon)}
        {children}
        {(iconPlacement === 'right' && icon)}
      </>
    );
    return (
      <ShadcnUIButton className={className} variant={variant} size={size} fontWeight={fontWeight} ref={ref} asChild={asChild} {...props}>
        {content}
      </ShadcnUIButton>
    )
})

Button.displayName = 'Button';

export {Button};
export type {ButtonProps};