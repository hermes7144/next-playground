'use client';

import { useState } from 'react';
import useSWR from 'swr';
import ConfirmButton from '@/components/ConfirmButton';
import ConfirmInfoTable from '@/components/ConfirmInfoTable';
import LoadingOverlay from '@/components/LoadingOverlay';
import { useProcedure } from '@/hooks/useProcedure';
import { json } from 'stream/consumers';

export default function BAA002Page() {
  const { callProcedure } = useProcedure();
  const [isMutating, setIsMutating] = useState(false);

  const fetcher = () =>
    callProcedure('post', '조회', {
      mojib_yy: '2024',
      ibhag_gb: 'B35001',
      mojib_gb: 'NONE',
      program_id: 'BAA002',
      sabeon: '360852',
    }).then((res) => res.data[0]);

  const { data, error, mutate } = useSWR('BAA002-조회', fetcher);

  const handleClick = async (flag: 'Y' | 'N') => {
    setIsMutating(true); // 🔵 Start loading

    const res = await callProcedure('put', '확정처리', {
      mojib_yy: '2024',
      ibhag_gb: 'B35001',
      mojib_gb: 'NONE',
      program_id: 'BAA002',
      hwagjeong_yn: flag,
      id: '360852',
      ip: '127.0.0.1',
    });

    if (res.success) {
      alert('확정처리되었습니다');
    } else {
      alert(res.message);
    }

    await mutate(); // 데이터 갱신
    setIsMutating(false); // 🔵 End loading
  };

  const handleButton = async () => {
    const res = await callProcedure('post', '컬럼헤더', { report_id: 'R22' });
    console.log(res.data[0].col_nm);
    console.log(res.data[0].header);
  };

  const handleButton2 = async () => {
    const res = await callProcedure('put', '등록', [
      {
        mojib_yy: '2024',
        ibhag_gb: 'B35001',
        mojib_gb: 'B01001',
        mojib_cd: '34',
        myeonjeob_gb: 'B26002',
        suheom_no: '1344001',
        gyeolsi_yn: 'N',
        id: '@UWIN_ID',
        ip: '@UWIN_UserIP',
      },
      {
        mojib_yy: '2024',
        ibhag_gb: 'B35001',
        mojib_gb: 'B01001',
        mojib_cd: '34',
        myeonjeob_gb: 'B26002',
        suheom_no: '1344002',
        gyeolsi_yn: 'N',
        id: '@UWIN_ID',
        ip: '@UWIN_UserIP',
      },
    ]);
  };

  const handleButton3 = async () => {
    const res = await callProcedure('post', '전형료JSON', {
      userid: 'yaint',
      clientip: '127.0.0.1',
      jsonData: JSON.stringify([
        { rowstate: 'D', mojib_yy: '2024', ibhag_gb: 'B35001', mojib_gb: 'B01001', jeonhyeong_gb: 'J00013', mojib_cd: '34', jeonhyeong_amt: 30000, susuryo_amt: null },
        { rowstate: 'D', mojib_yy: '2024', ibhag_gb: 'B35001', mojib_gb: 'B01001', jeonhyeong_gb: 'J00013', mojib_cd: '64', jeonhyeong_amt: 35000, susuryo_amt: 0 },
      ]),
    });
  };

  if (error) return <div>에러 발생</div>;

  return (
    <div style={{ position: 'relative', minHeight: '300px' }}>
      {(!data || isMutating) && <LoadingOverlay />}

      {/* ✅ 테이블은 항상 표시 */}
      <ConfirmInfoTable data={data || {}} />

      {data && (
        <div className='flex gap-2'>
          <ConfirmButton confirmed={data.hwagjeong_yn === 'Y'} onClick={handleClick} />
          <button className='btn' onClick={handleButton}>
            받아오기 다중
          </button>
          <button className='btn' onClick={handleButton2}>
            다중테스트
          </button>
          <button className='btn' onClick={handleButton3}>
            JSON테스트
          </button>
        </div>
      )}
    </div>
  );
}
