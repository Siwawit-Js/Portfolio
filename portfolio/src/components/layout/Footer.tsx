import { PROFILE } from '../../data/profile';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-rule px-6 py-10 md:px-12 lg:px-20 bg-background">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 md:grid-cols-3 gap-6 text-ink/65">
        <div>
          <div className="font-display font-bold text-xl text-ink tracking-tight">
            {PROFILE.name}
            <span className="text-primary">.</span>
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            — Thailand
          </p>
        </div>

        <div className="md:col-start-3 md:text-right font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          © {year} — Create with passion,<br />
          by Siwawit Junsupaporn
        </div>
      </div>
    </footer>
  );
}
