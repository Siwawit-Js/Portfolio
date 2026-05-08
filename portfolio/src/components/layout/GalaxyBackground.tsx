import { useMemo } from 'react';

export function GalaxyBackground() {
  const meteors = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 60}%`,
        left: `${50 + Math.random() * 50}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${4 + Math.random() * 4}s`,
      })),
    [],
  );

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Deep space base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom,_rgba(34,211,238,0.10),_transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.20),_transparent_55%),radial-gradient(ellipse_at_bottom,_rgba(34,211,238,0.10),_transparent_55%)]" />

      {/* Far stars (slow + small) */}
      <div className="absolute inset-0 stars-bg-far opacity-60 animate-twinkle-delayed" />

      {/* Mid stars */}
      <div className="absolute inset-0 stars-bg opacity-70 animate-twinkle" />

      {/* Color stars (purple + cyan) */}
      <div className="absolute inset-0 stars-bg-color opacity-50 animate-twinkle-delayed" />

      {/* Nebula clouds */}
      <div className="absolute -top-20 -left-20 w-[40rem] h-[40rem] rounded-full bg-nebula-500/20 blur-[120px] animate-nebula-drift" />
      <div className="absolute top-1/2 -right-32 w-[36rem] h-[36rem] rounded-full bg-primary-500/20 blur-[140px] animate-nebula-drift" style={{ animationDelay: '5s' }} />
      <div className="absolute bottom-0 left-1/3 w-[30rem] h-[30rem] rounded-full bg-cosmos-500/15 blur-[120px] animate-nebula-drift" style={{ animationDelay: '10s' }} />

      {/* Cosmic grid */}
      <div className="absolute inset-0 grid-cosmic opacity-40" />

      {/* Meteors */}
      {meteors.map((m) => (
        <span
          key={m.id}
          className="meteor animate-meteor"
          style={{
            top: m.top,
            left: m.left,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </div>
  );
}
