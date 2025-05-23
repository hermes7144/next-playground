export default function Sidebar({ isOpen, onClose, openTab }) {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <button className="btn btn-sm btn-ghost mb-6" onClick={onClose}>
        닫기
      </button>
      <nav>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => openTab('/ENTN/A/BAA002')}
              className="hover:text-primary"
            >
              BAA002 바로가기
            </button>
          </li>
          <li>
            <button
              onClick={() => openTab('/auth/signin')}
              className="hover:text-primary"
            >
              로그인
            </button>
          </li>
          <li>
            <button
              onClick={() => openTab('/menu3')}
              className="hover:text-primary"
            >
              메뉴3
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
