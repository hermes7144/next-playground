'use client';

import * as React from 'react';
import { useEffect } from 'react'; 
import { useQuery } from '@tanstack/react-query';
import { useProcedure } from '@/hooks/useProcedure'

import {
    Dialog,
    DialogContent,
    DialogDescription, 
    DialogHeader,
    DialogTitle,
    DialogTrigger, 
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

import { Button } from './Button';

import {
    Table,     
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow, 
} from "@/components/ui/table";

export interface StudentInfoResultRow {
    hagbeon?: string;
    nm?: string;
    jumin_no1?: string;
    sex_nm?: string;
    daehag_nm?: string;
    hagbu_nm?: string;
    sosog_nm?: string;
    hagnyeon?: string;
    juya_nm?: string;
    gwajeong_nm?: string;
    ibhag?: string;
    hagjeog_st_gb?: string;
    hagjeog_st_nm?: string;
    fl_hjbd?: string;
    yejeong_st?: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data: T[][];
    message?: string;
    errorCode?: number;
    dbError?: any;
}

export type SameNameQueryResult = StudentInfoResultRow[];

export interface SameNameSearchDialogProps {
    open: boolean;
    onOpenChange: (isOpen: boolean) => void
    searchName: string;
    onRowSelect: (selectedStudent: StudentInfoResultRow) => void;
}

export function SameNameSearchDialog({
    open,
    onOpenChange,
    searchName,
    onRowSelect,
}: SameNameSearchDialogProps) {
    const { callProcedure } = useProcedure();
    const {
        data: sameNameData,
        isLoading: isSameNameLoading,
        isError: isSameNameError,
        error: sameNameError,

    } = useQuery<SameNameQueryResult, Error>({
        queryKey: ['sameNameSearch', searchName],
        
        queryFn: async () => {
            if(!searchName || searchName.trim() === '') {
                console.log("성명이 비어있습니다.");
                return [];
            }
            const res = await callProcedure(
                '학번조회',
                {
                    gubun: '',
                    bu_cd: '11335',
                    hagbeon: searchName,
                    sabeon: '360852'
                },
            ) as ApiResponse<SameNameQueryResult>
            console.log(res);
            if(res && res.data && Array.isArray(res.data) && res.data.length > 0)  {
                const studentArray = res.data[0] as StudentInfoResultRow[];
                return studentArray;
            } else {
                console.error("동명이인 조회 오류:", res);
                throw new Error("동명이인 조회 오류");
            }
        },
        enabled: open && searchName !== '' && searchName.trim() !== '',
        retry: 1,
    })

    const handleRowClick = (selectedStudent: StudentInfoResultRow) => {
        onRowSelect(selectedStudent);
        onOpenChange(false);
    }

    useEffect(() => {
        if (isSameNameError && sameNameError) {
            console.error("useQuery 동명이인 조회 오류 (useEffect):", sameNameError);
        }
    }, [isSameNameError, sameNameError]);
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[500px] flex flex-col">
                <DialogHeader>
                    <DialogTitle>동명이인 ({searchName || ''}) 조회</DialogTitle>
                    <DialogDescription>동명이인 목록 조회</DialogDescription>
                </DialogHeader>
                    {isSameNameLoading && <p className='text-center'>데이터 조회 중...</p>}
                    {isSameNameError && <p className='text-center text-red-500'>오류: {sameNameError?.message || '알 수 없는 오류'}</p>}
                    {!isSameNameLoading && !isSameNameError && (
                        <div className='flex-grow overflow-y-auto'>
                            {Array.isArray(sameNameData) && sameNameData.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableHead className="w-[100px] text-center">학번</TableHead> 
                                        <TableHead className="w-[150px] text-center">성명</TableHead> 
                                        <TableHead className="w-[200px] text-center">소속</TableHead> 
                                        <TableHead className="w-[80px] text-center">학년</TableHead> 
                                        <TableHead className="w-[100px] text-center">학적<br/>상태</TableHead>
                                        <TableHead className="w-[150px] text-center">생년월일</TableHead>
                                    </TableHeader>
                                    <TableBody>
                                        {sameNameData.map((student: StudentInfoResultRow, index) => (
                                            <TableRow key={student.hagbeon || `row-${index}`} onClick={() => handleRowClick(student)}
                                                className='cursor-pointer'>
                                                <TableCell className="text-center font-medium">{student.hagbeon}</TableCell> 
                                                <TableCell className="text-center">{student.nm}</TableCell> 
                                                <TableCell className="text-center">{student.sosog_nm}</TableCell> 
                                                <TableCell className="text-center">{student.hagnyeon}</TableCell> 
                                                <TableCell className="text-center">{student.hagjeog_st_nm}</TableCell>
                                                <TableCell className="text-center">{student.jumin_no1}</TableCell>
                                            </TableRow>
                                        ))
                                        }
                                    </TableBody>
                                </Table>
                            ): (
                                <div className='text-center'>
                                    {searchName.trim() === '' ? '성명을 입력하여 조회해주세요.': '조회 결과가 없습니다.'}
                                </div>
                            )}
                        </div>
                    )}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button preset='cancel'>닫기</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}