export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/60 ">
      <span className="loading loading-spinner text-primary w-12 h-12 mb-4" />
      <p className="text-gray-700 font-medium">처리 중입니다...</p>
    </div>
  );
}