'use client';

import { useProcedure } from '@/app/hooks/useProcedure';
import { useEffect, useState } from 'react';


export default function BAA002Page() {
  const [data, setData] = useState();
  const { callProcedure } = useProcedure();

  useEffect(() => {
    callProcedure('post', '조회', {
      mojib_yy: '2024',
      ibhag_gb: 'B35001',
      mojib_gb: 'NONE',
      program_id:"BAA002",
      sabeon:'360852',
    }).then(res => setData(res[0])).catch(console.error);
  }, [callProcedure]);

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
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  return (
  <div className="filters">
    {data && <>
          <div className="filters__wrap" style={{ width: '70%' }}>
        <table className="TableStyle01" style={{ margin: 0 }} width="100%" cellSpacing="0" cellPadding="0">
          <caption>확정처리 폼입니다.</caption>
          <colgroup>
            <col width="10%" />
            <col width="17%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="17%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <tbody>
            <tr>
              <th className="textWrap Center">
                <label htmlFor="firstConfirmedAt">최초확정일시</label>
              </th>
              <td className="inputWrap Center">
                <span id="firstConfirmedAt">{data?.hwagjeong_1st_dt}</span>
              </td>

              <th className="textWrap Center">
                <label htmlFor="firstConfirmer">최초확정자</label>
              </th>
              <td className="inputWrap Center">
                <strong id="firstConfirmer">{data?.hwagjeongja}</strong>
              </td>

              <th className="textWrap Center">
                <label htmlFor="reConfirmedAt">
                  {data?.hwagjeong_yn ? '재확정일시': '확정취소일시'}
                </label>
              </th>
              <td className="inputWrap Center">
                <span id="reConfirmedAt">{data?.hwagjeong_dt}</span>
              </td>

              <th className="textWrap Center">
                <label htmlFor="confirmer">
                  {data?.hwagjeong_yn ? '확정처리자' : '확정취소자'}
                </label>
              </th>
              <td className="inputWrap Center">
                <strong id="confirmer">{data?.hwagjeongja}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="filters__btnArea" id="hwagjeongBtnArea">
       {data.hwagjeong_yn  === 'Y' ? <button
          type="button"
          className="bem-btn bem-btn--confirm bem-icon--check"
          onClick={() => {
            handleClick('N');
          }}
        >
          확정취소
        </button> :
                <button
          type="button"
          className="bem-btn bem-btn--revert bem-icon--revert"
          onClick={() => {
            handleClick('Y');
          }}
        >
          확정
        </button>
      } 

      </div>
    
    </>
    
    }
    </div>
  );
}
