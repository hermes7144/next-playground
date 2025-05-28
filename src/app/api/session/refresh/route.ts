import { getSession } from '@/lib/session';

export async function GET() {
  const session = await getSession();
  if (!session?.user) {
    return new Response(
      JSON.stringify({ error: "Unauthenticated" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  await session.save();

  return new Response(
    JSON.stringify({ ok: true }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
