export function ServiceSuspended() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-surface px-6 py-24">
      <div className="max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground md:text-sm">
          Serviciu suspendat temporar
        </p>

        <h1 className="mt-8 text-4xl font-bold leading-tight text-foreground md:text-5xl">
          Acest site este momentan indisponibil
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Revenim în scurt timp. Momentan nu preluăm cereri de rezervare online.
        </p>
      </div>
    </main>
  );
}
