import { useEffect, useState } from 'react';
import { FolderKanban, Sparkles, Briefcase, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { getProjects } from '../services/projects';
import { getSkills } from '../services/skills';
import { getExperiences } from '../services/experience';

export function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, skills: 0, experience: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProjects(), getSkills(), getExperiences()])
      .then(([p, s, e]) => setStats({ projects: p.length, skills: s.length, experience: e.length }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Projects', value: stats.projects, icon: FolderKanban, color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { label: 'Skills', value: stats.skills, icon: Sparkles, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { label: 'Experience', value: stats.experience, icon: Briefcase, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Overview of your portfolio content</p>
      </div>

      {/* Stats grid */}
      <div className="grid sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Card key={card.label} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                  {loading ? '—' : card.value}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick info */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Getting Started</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Manage your portfolio content from the sidebar navigation.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <span className="font-medium text-slate-700 dark:text-slate-300">📁 Projects</span>
            <span className="text-slate-500 dark:text-slate-400 ml-1">— Add, edit, or delete projects</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <span className="font-medium text-slate-700 dark:text-slate-300">⚡ Skills</span>
            <span className="text-slate-500 dark:text-slate-400 ml-1">— Manage your tech stack</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <span className="font-medium text-slate-700 dark:text-slate-300">💼 Experience</span>
            <span className="text-slate-500 dark:text-slate-400 ml-1">— Update your work history</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <span className="font-medium text-slate-700 dark:text-slate-300">👤 Profile</span>
            <span className="text-slate-500 dark:text-slate-400 ml-1">— Edit your personal info</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
