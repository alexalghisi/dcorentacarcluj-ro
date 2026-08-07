export function ServiceSuspended() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#faf7f0] px-6 py-24">
      <div className="max-w-2xl text-center">
        <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#6b6459]">
          Site suspendat
        </p>

        <h1
          className="mt-8 text-[2.75rem] md:text-6xl leading-[1.05] text-[#1a1712]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Acest site este suspendat
        </h1>

        <p className="mt-6 text-lg md:text-xl font-semibold text-[#1a1712]">
          Motiv: neplată servicii
        </p>

        <p className="mt-8 text-lg md:text-xl leading-relaxed text-[#4a453d]">
          Serviciile de găzduire, dezvoltare și mentenanță sunt oprite ca urmare a
          neachitării facturilor. Conținutul nu este disponibil.
        </p>

        <p className="mt-8 text-sm md:text-base text-[#6b6459]">
          Pentru reactivare, contactați dezvoltatorul site-ului.
        </p>
      </div>
    </main>
  );
}
