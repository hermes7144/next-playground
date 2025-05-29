'use client';

import * as React from 'react';
import { useRef, useEffect, useState } from 'react';

import { Button } from '@/components/common/Button';
import { X } from 'lucide-react';
import { AlertDialog } from '@/components/common/AlertDialog';

export default function DESIGNPAGE() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const buttonToFocusRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if(buttonToFocusRef.current) {
            buttonToFocusRef.current.focus();
            console.log("Button Ref Test Success")
        }
        else {
            console.log("Button Ref Test Fail")
        }
    }, [])
    
    const handleButton = () => {
        console.log("onClick Test");
    }
    
    const dialogButton = () => {
        setIsDialogOpen(true);
    }
    const dialogConfirm = () => {
        console.log("Confirm");
    }
    const dialogCancel = () => {
        console.log("Cancel")
    }

    return (
        <div>
            <AlertDialog 
                open={isDialogOpen} onOpenChange={setIsDialogOpen}
                trigger={<Button preset='confirm' onClick={dialogButton}>DIALOG</Button>}
                onConfirm={dialogConfirm}
                onCancel={dialogCancel}
            />
            <Button preset='confirm'>확인</Button>
            <Button preset='search'>조회</Button>
            <Button preset='save'>저장</Button>
            <Button preset='edit'>수정</Button>
            <Button preset='delete' onClick={handleButton} ref={buttonToFocusRef}>삭제</Button>
            <Button preset='cancel'>취소</Button>
            <Button>기본</Button>
            <Button icon={<X />} iconPlacement='right'>IconPlacement</Button>
        </div>
    )
}