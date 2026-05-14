import { PROFILE } from '../../data/profile';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ink/15 px-6 py-12 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 text-ink/70">
        <div className="col-span-12 md:col-span-4">
          <div className="font-display text-2xl tracking-editorial text-ink">
            {PROFILE.name}.
          </div>
          <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.2em]">
            Bangkok / Pathum Thani — Thailand
          </p>
        </div>

        <div className="col-span-6 md:col-span-4">
          <div className="marker mb-3 text-ink/50">Colophon</div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] leading-relaxed">
            Set in Fraunces &amp; Newsreader.
            <br />
            Hand-typeset with React &amp; Tailwind.
          </p>
        </div>

        <div className="col-span-6 md:col-span-4 md:text-right">
          <div className="marker mb-3 text-ink/50">© {year}</div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em]">
            Every pixel — placed on purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
