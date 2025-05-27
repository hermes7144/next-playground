"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCsrf } from '@/contexts/csrf-context';
import axios from 'axios';

export default function SigninPage() {
  const { setCsrfToken } = useCsrf();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const data = await axios.post("/api/login", { username, password }).then(res => res.data);

    if (data.ok) {
      setCsrfToken(data.csrfToken); // 토큰 Context 저장
      router.push("/"); // 로그인 성공 시 리디렉션
    } else {
      setError(data?.error || "로그인 실패");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">아이디</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">비밀번호</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
