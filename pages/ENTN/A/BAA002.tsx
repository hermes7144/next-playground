'use client';

import { useProcedure } from '@/app/hooks/useProcedure';
import { useEffect, useState } from 'react';

interface ScheduleItem {
  mojib_gb: string;
  sebu_iljeong_gb: string;
  mojib_fr_dt: string;
  mojib_to_dt: string;
  jageob_yn: string;
}  

export default function BAA002Page() {
  const [data, setData] = useState<ScheduleItem[]>([]);
  const { callProcedure } = useProcedure();

  useEffect(() => {
    callProcedure<ScheduleItem[]>('post', '조회', {
      mojib_yy: '2024',
      ibhag_gb: 'B35001',
      mojib_gb: 'B01001',
    }).then(setData).catch(console.error);
  }, [callProcedure]);

  const handleClick = async () => {
    try {
      await callProcedure('put', '확정처리', {
        mojib_yy: '2024',
        ibhag_gb: 'B35001',
        mojib_gb: 'NONE',
        program_id: 'BAA002',
        hwagjeong_yn: 'N',
        id: '360852',
        ip: '127.0.0.1',
      });
      alert('처리되었습니다.');
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>확정</button>
      {data.map(item => (
        <div key={item.sebu_iljeong_gb}>
          <div>{item.mojib_gb}</div>
          <div>{item.sebu_iljeong_gb}</div>
          <div>{item.mojib_fr_dt}</div>
          <div>{item.mojib_to_dt}</div>
          <div>{item.jageob_yn}</div>
        </div>
      ))}
    </div>
  );
}
