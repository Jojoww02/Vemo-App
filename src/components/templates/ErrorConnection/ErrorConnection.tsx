export default function ErrorConnection() {
  return (
    <div className="min-h-screen w-full grid place-items-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <img src="/network-error.svg" width={120} alt="" />
        <div className="text-center text-xs">
          <span className="text-sm">
            Mohon maaf <br /> Vemo sedang bermasalah
          </span>
          <p className="text-slate-500 pt-2">
            Silahkan kembali beberapa saat nanti
          </p>
        </div>
      </div>
    </div>
  );
}
