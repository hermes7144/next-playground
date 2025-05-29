import * as React from 'react'
import {
  AlertDialog as ShadcnAlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export interface AlertDialogProps {
    open: boolean;
    onOpenChange: (isOpen: boolean) => void;
    trigger: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    onConfirm: () => void;
    confirmText?: string;
    onCancel?: () => void;
    cancelText?: string;
    className?: string;
}

export const AlertDialog = ({
    open,
    onOpenChange,
    trigger,
    title,
    description,
    onConfirm,
    confirmText,
    onCancel,
    cancelText,
    className
}:AlertDialogProps) => {
    return (
        <ShadcnAlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent className={className}>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title || "정말로 진행하시겠습니까?"}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={onConfirm}>{confirmText || "YES"}</AlertDialogAction>
                    <AlertDialogCancel onClick={onCancel}>{cancelText || "NO"}</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </ShadcnAlertDialog>
    )
}

AlertDialog.displayName = "AlertDialog";