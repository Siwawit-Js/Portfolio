import { useEffect, useState } from 'react';
import { Github, Linkedin, Heart } from 'lucide-react';
import { getProfile } from '../../services/profile';
import type { Profile } from '../../types';

export function Footer() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  const toUrl = (url: string) => /^https?:\/\//.test(url) ? url : `https://${url}`;

  return (
    <footer className="relative border-t border-white/10 bg-space-950/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400 flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-nebula-400 fill-current" /> by Siwawit
          </p>

          <div className="flex items-center gap-3">
            {profile?.github && (
              <a
                href={toUrl(profile.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {profile?.linkedin && (
              <a
                href={toUrl(profile.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {profile?.facebook && (
              <a
                href={toUrl(profile.facebook)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            )}
          </div>
        </div>
        <p className="text-center text-xs text-slate-500 mt-6">
          © {new Date().getFullYear()} {profile?.name || ''} · Wandering the cosmos.
        </p>
      </div>
    </footer>
  );
}
