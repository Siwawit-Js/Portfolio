import { Heart } from 'lucide-react';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { useProfile } from '../../hooks/useProfile';
import { toUrl } from '../../utils/helpers';

const SOCIAL_LINK_CLASS =
  'p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200';

export function Footer() {
  const profile = useProfile();

  return (
    <footer className="relative border-t border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600 flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-primary-500 fill-current" /> by Siwawit
          </p>

          <div className="flex items-center gap-3">
            {profile?.github && (
              <a
                href={toUrl(profile.github)}
                target="_blank"
                rel="noopener noreferrer"
                className={SOCIAL_LINK_CLASS}
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            )}
            {profile?.linkedin && (
              <a
                href={toUrl(profile.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className={SOCIAL_LINK_CLASS}
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            )}
            {profile?.facebook && (
              <a
                href={toUrl(profile.facebook)}
                target="_blank"
                rel="noopener noreferrer"
                className={SOCIAL_LINK_CLASS}
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
        <p className="text-center text-xs text-slate-500 mt-6">
          © {new Date().getFullYear()} {profile?.name ?? ''} · Wandering the cosmos.
        </p>
      </div>
    </footer>
  );
}
