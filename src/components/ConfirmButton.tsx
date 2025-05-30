type ConfirmButtonProps = {
  confirmed: boolean;
  onClick: () => void;
};

export default function ConfirmButton({ confirmed, onClick }: ConfirmButtonProps) {
  return (
    <div className="filters__btnArea" id="hwagjeongBtnArea">
      {confirmed ? (
        <button
          type="button"
          className="btn"
          onClick={() => onClick()}
        >
          확정취소
        </button>
      ) : (
        <button
          type="button"
          className="btn"
          onClick={() => onClick()}
        >
          확정
        </button>
      )}
    </div>
  );
}
