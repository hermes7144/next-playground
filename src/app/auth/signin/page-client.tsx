"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCsrf } from '@/contexts/csrf-context';
import axios from 'axios';

export default function SigninPage() {
  const { setCsrfToken } = useCsrf();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  // ✅ 이미 로그인된 사용자는 자동 리다이렉트
  useEffect(() => {
    axios.get("/api/me") // 세션 확인 API (예시)
      .then(res => {
        if (res.data?.user) {
          router.push(redirect); // 이미 로그인됐으면 리다이렉트
        }
      })
      .catch(() => {
        // 무시 - 로그인 안 되어있으면 그냥 페이지 보여줌
      });
  }, [redirect, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await axios
        .post("/api/login", { username, password }, { withCredentials: true })
        .then(res => res.data);

      if (data.ok) {
        setCsrfToken(data.csrfToken);
        router.push(redirect);
      } else {
        setError(data?.error || "로그인 실패");
      }
    } catch {
      setError("로그인 중 오류 발생");
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
