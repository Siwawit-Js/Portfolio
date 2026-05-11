export function VortexBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Stars */}
      <div className="absolute inset-0 stars-bg-far opacity-25 animate-twinkle-delayed" />
      <div className="absolute inset-0 stars-bg opacity-30 animate-twinkle" />

      {/* Green ambient glow — top left */}
      <div
        className="absolute -top-32 -left-32 w-[40rem] h-[40rem] rounded-full"
        style={{ background: 'radial-gradient(ellipse at 30% 30%, rgba(0,204,130,0.10) 0%, transparent 65%)' }}
      />

      {/* Subtle green ambient — bottom right */}
      <div
        className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full"
        style={{ background: 'radial-gradient(ellipse at 70% 70%, rgba(18,233,156,0.06) 0%, transparent 60%)' }}
      />
    </div>
  );
}
