type ConfirmButtonProps = {
  confirmed: boolean;
  onClick: (flag: 'Y' | 'N') => void;
};

export default function ConfirmButton({ confirmed, onClick }: ConfirmButtonProps) {
  return (
    <div className="filters__btnArea" id="hwagjeongBtnArea">
      {confirmed ? (
        <button
          type="button"
          className="bem-btn bem-btn--confirm bem-icon--check"
          onClick={() => onClick('N')}
        >
          확정취소
        </button>
      ) : (
        <button
          type="button"
          className="bem-btn bem-btn--revert bem-icon--revert"
          onClick={() => onClick('Y')}
        >
          확정
        </button>
      )}
    </div>
  );
}
