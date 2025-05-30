'use client';

import ConfirmButton from '@/components/ConfirmButton';
import ConfirmInfoTable from '@/components/ConfirmInfoTable';
import LoadingOverlay from '@/components/LoadingOverlay';
import { useProcedure } from '@/hooks/useProcedure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type ConfirmResult = {
  success: boolean;
  data?: string;
  message: string;
};

type 조회결과 = {
  name: string;
  age: number;
  department: string;
  hwagjeong_yn: string;
};

export default function BAA002Page() {
  const queryClient = useQueryClient();
  const { callProcedure } = useProcedure();

  const fetcher = () =>
    callProcedure<{ data: 조회결과[][] }>('조회', {
      mojib_yy: '2024',
      ibhag_gb: 'B35001',
      mojib_gb: 'NONE',
      program_id: 'BAA002',
      sabeon: '360852',
    }).then((res) => res.data[0][0]);

  const { data, isLoading, isError } = useQuery({ queryKey: ['조회'], queryFn: fetcher });

  const mutating = (): Promise<ConfirmResult> =>
    callProcedure<ConfirmResult>(
      '확정처리',
      {
        mojib_yy: '2024',
        ibhag_gb: 'B35001',
        mojib_gb: 'NONE',
        program_id: 'BAA002',
        // hwagjeong_yn: data?.hwagjeong_yn === 'Y' ? 'N' : 'Y',
        hwagjeong_yn: 'N',
        id: '360852',
        ip: '127.0.0.1',
      },
      true
    );

  const confirmMutation = useMutation<ConfirmResult, Error, void>({
    mutationFn: mutating,
    onSuccess: (res) => {
      alert(res.data || '처리되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['조회'] });
    },

    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : error.message;

      alert(`확정 오류: ${message || '알 수 없는 오류'}`);
    },
  });

  if (isError) return <div>조회 중 에러 발생</div>;

  const handleButton = async () => {
    const res = await callProcedure('컬럼헤더', { report_id: 'R22' });
    console.log(res);
  };

  const handleButton2 = async () => {
    const res = await callProcedure(
      '등록',
      [
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
      ],
      true
    );
    console.log('다중테스트', res);
  };

  const handleButton3 = async () => {
    const res = await callProcedure(
      '전형료JSON',
      {
        userid: 'yaint',
        clientip: '127.0.0.1',
        jsonData: JSON.stringify([
          { rowstate: 'D', mojib_yy: '2024', ibhag_gb: 'B35001', mojib_gb: 'B01001', jeonhyeong_gb: 'J00013', mojib_cd: '34', jeonhyeong_amt: 30000, susuryo_amt: null },
          { rowstate: 'D', mojib_yy: '2024', ibhag_gb: 'B35001', mojib_gb: 'B01001', jeonhyeong_gb: 'J00013', mojib_cd: '64', jeonhyeong_amt: 35000, susuryo_amt: 0 },
        ]),
      },
      true
    );

    console.log('전형료JSON', res);
  };

  if (isError) return <div>에러 발생</div>;

  return (
    <div style={{ position: 'relative', minHeight: '300px' }}>
      {(isLoading || confirmMutation.status === 'pending') && <LoadingOverlay />}
      <ConfirmInfoTable data={data || {}} />
      {data && (
        <div className='flex gap-2'>
          <ConfirmButton confirmed={data.hwagjeong_yn === 'Y'} onClick={confirmMutation.mutate} />
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
