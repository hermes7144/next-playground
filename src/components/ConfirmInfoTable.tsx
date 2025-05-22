type ConfirmInfoTableProps = {
  data: any;
};

export default function ConfirmInfoTable({ data }: ConfirmInfoTableProps) {
  return (
    <div className="filters__wrap" style={{ width: '70%' }}>
      <table className="table border-2 border-black">
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
              <label htmlFor="reConfirmedAt">{data?.hwagjeong_yn === 'Y' ? '재확정일시' : '확정취소일시'}</label>
            </th>
            <td className="inputWrap Center">
              <span id="reConfirmedAt">{data?.hwagjeong_dt}</span>
            </td>
            <th className="textWrap Center">
              <label htmlFor="confirmer">{data?.hwagjeong_yn === 'Y' ? '확정처리자' : '확정취소자'}</label>
            </th>
            <td className="inputWrap Center">
              <strong id="confirmer">{data?.hwagjeongja}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
