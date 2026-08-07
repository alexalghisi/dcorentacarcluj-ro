export function ServiceSuspended() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 py-20">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Serviciu suspendat
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Acest site este momentan suspendat și nu preia cereri de rezervare.
          Pentru informații, vă rugăm să contactați proprietarul afacerii.
        </p>
        <p className="text-sm text-muted-foreground">
          Serviciul poate fi reactivat oricând de către administratorul site-ului.
        </p>
      </div>
    </main>
  );
}
