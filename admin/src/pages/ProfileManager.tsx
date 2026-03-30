import { useEffect, useState } from 'react';
import { Save, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { getProfile, updateProfile, createProfile } from '../services/profile';
import type { Profile, ProfileFormData } from '../types';

export function ProfileManager() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ProfileFormData>({
    name: '', role: '', bio: '', about: '', avatar_url: '', resume_url: '', email: '', github: '', linkedin: '',
  });

  useEffect(() => {
    getProfile().then(p => {
      setProfile(p);
      if (p) setForm({ name: p.name, role: p.role, bio: p.bio || '', about: p.about || '', avatar_url: p.avatar_url || '', resume_url: p.resume_url || '', email: p.email || '', github: p.github || '', linkedin: p.linkedin || '' });
    }).catch(() => toast.error('Failed to load profile')).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!form.name.trim() || !form.role.trim()) { toast.error('Name and role required'); return; }
    setSaving(true);
    try {
      if (profile) {
        const updated = await updateProfile(profile.id, form);
        setProfile(updated);
      } else {
        const created = await createProfile(form);
        setProfile(created);
      }
      toast.success('Profile saved');
    } catch (err: any) { toast.error(err.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="animate-pulse h-12 rounded-xl bg-slate-200 dark:bg-white/5" />)}</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Update your personal information</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
          <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center">
            {form.avatar_url ? (
              <img src={form.avatar_url} alt="" className="w-full h-full rounded-2xl object-cover" />
            ) : (
              <User className="w-8 h-8 text-primary-500" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">{form.name || 'Your Name'}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{form.role || 'Your Role'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <Input label="Role *" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Full Stack Developer" />
          </div>
          <Input label="Email" type="email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} />
          <Textarea label="Short Bio" value={form.bio || ''} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="A brief intro..." />
          <Textarea label="About (long)" value={form.about || ''} onChange={e => setForm({ ...form, about: e.target.value })} placeholder="Detailed info about yourself..." />
          <Input label="Avatar URL" value={form.avatar_url || ''} onChange={e => setForm({ ...form, avatar_url: e.target.value })} />
          <Input label="Resume URL" value={form.resume_url || ''} onChange={e => setForm({ ...form, resume_url: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="GitHub URL" value={form.github || ''} onChange={e => setForm({ ...form, github: e.target.value })} />
            <Input label="LinkedIn URL" value={form.linkedin || ''} onChange={e => setForm({ ...form, linkedin: e.target.value })} />
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-white/10">
            <Button onClick={handleSave} loading={saving} size="lg">
              <Save className="w-4 h-4" /> Save Profile
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
