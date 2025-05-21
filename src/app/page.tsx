import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold mb-8">홈페이지</h1>
      
      <nav className="space-y-4">
        <Link
          href="/ENTN/A/BAA002"
          className="block bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          BAA002 바로가기
        </Link>

        <Link
          href="/auth/signin"
          className="block bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          로그인
        </Link>
      </nav>
    </div>
  );
}
