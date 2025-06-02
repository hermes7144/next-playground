'use client'
import { useState } from 'react';

import { Button } from '@/components/common/Button';
import { Input } from "@/components/ui/input"
import { DescriptionList, DescriptionListItem } from '@/components/common/DescriptionList';
import { useProcedure } from '@/hooks/useProcedure';
import { SameNameSearchDialog, SameNameSearchDialogProps, StudentInfoResultRow } from '@/components/common/SameNameSearchDialog';

export default function SCC001Page() {
    const [isSameNamePopupOpen,setIsSameNamePopupOpen] = useState(false);
    // const [searchHagbeon, setSearchHagbeon] = useState('');
    // const [searchName, setSearchName] = useState(''); 
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null);

    const handleOpenSameNamePopup = () => {
        setIsSameNamePopupOpen(true);
    }
    // const handleSearchHagbeonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchHagbeon(event.target.value); 
    // }
    // const handleSearchNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchName(event.target.value);
    // };
    const handleSameNameRowSelect = (selectedStudent: StudentInfoResultRow) => {
        console.log("팝업에서 학생 선택됨:", selectedStudent);
    };

    return(
        <div className='p-8'>
            <Button onClick={handleOpenSameNamePopup}>팝업 열기</Button>
            <SameNameSearchDialog 
                open={isSameNamePopupOpen} 
                onOpenChange={setIsSameNamePopupOpen}
                searchName='김진'
                onRowSelect={handleSameNameRowSelect}
            />
        </div>
    )
}