'use client';
import ConfirmButton from '@/components/ConfirmButton';
import ConfirmInfoTable from '@/components/ConfirmInfoTable';
import { useProcedure } from '@/hooks/useProcedure';
import { useEffect, useState, useCallback } from 'react';

export default function BAA002Page() {
  const [data, setData] = useState();
  const { callProcedure } = useProcedure();

  const search = useCallback(() => {
    callProcedure('post', '조회', {
      mojib_yy: '2024',
      ibhag_gb: 'B35001',
      mojib_gb: 'NONE',
      program_id: 'BAA002',
      sabeon: '360852',
    })
      .then((res) => setData(res[0]))
      .catch(console.error);
  }, [callProcedure]);

  useEffect(() => {
    search();
  }, [search]);

  const handleClick = async (flag) => {
    try {
      await callProcedure('put', '확정처리', {
        mojib_yy: '2024',
        ibhag_gb: 'B35001',
        mojib_gb: 'NONE',
        program_id: 'BAA002',
        hwagjeong_yn: flag,
        id: '360852',
        ip: '127.0.0.1',
      });

      alert('처리되었습니다.');
      search();
    } catch (err: any) {
      alert(err.response?.data?.message || '처리 실패');
    }
  };

 
  return (
    <div>
      {data && (
        <>
          <ConfirmInfoTable data={data} />
          <ConfirmButton confirmed={data.hwagjeong_yn === 'Y'} onClick={handleClick} />
        </>
      )}
    </div>
  );
}
