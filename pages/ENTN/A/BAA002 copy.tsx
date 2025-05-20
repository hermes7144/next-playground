'use client';
import ConfirmButton from '@/components/ConfirmButton';
import ConfirmInfoTable from '@/components/ConfirmInfoTable';
// SWR 사용
import { useProcedure } from '@/hooks/useProcedure';
import useSWR from 'swr';

export default function BAA002Page() {
  const { callProcedure } = useProcedure();

  
  // SWR key로 조회 파라미터를 그대로 사용
  const key = [
    'post',
    '조회',
    {
      mojib_yy: '2024',
      ibhag_gb: 'B35001',
      mojib_gb: 'NONE',
      program_id: 'BAA002',
      sabeon: '360852',
    },
  ] as const;

  // fetcher를 inline으로 정의
  const { data, error, mutate } = useSWR(
    key,
    ([method, action, payload]) =>
      callProcedure(method, action, payload).then((res) => res[0])
  );

const handleClick = async (flag: 'Y' | 'N') => {
  mutate(async (prevData) => {
    // 서버 요청 먼저
    await callProcedure('put', '확정처리', {
      mojib_yy: '2024',
      ibhag_gb: 'B35001',
      mojib_gb: 'NONE',
      program_id: 'BAA002',
      hwagjeong_yn: flag,
      id: '360852',
      ip: '127.0.0.1',
    });

    // 옵티미스틱 UI 업데이트
    return {
      ...prevData,
      hwagjeong_yn: flag,
      // hwagjeong_dt: new Date().toISOString(),
      //hwagjeongja: '홍길동',
    };
  }, {
    revalidate: true,           // 서버에서 최신 데이터 다시 가져옴
    rollbackOnError: true,      // 실패 시 이전 데이터로 복원
    populateCache: true,        // 캐시에 반영
  });

  alert('처리되었습니다.');
};


  if (error) return <div>에러 발생</div>;
  if (!data) return <div>불러오는 중...</div>;

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