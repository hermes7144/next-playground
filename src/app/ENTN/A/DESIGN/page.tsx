'use client';

import * as React from 'react';
import { useRef, useEffect } from 'react';

import { Button } from '@/components/common/Button';
import { X } from 'lucide-react';

export default function DESIGNPAGE() {
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
    
    const handleButton = (() => {
        console.log("onClick Test");
    })

    return (
        <div>
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