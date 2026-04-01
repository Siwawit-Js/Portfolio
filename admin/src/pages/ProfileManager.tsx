import { useEffect, useRef, useState } from 'react';
import { Save, Upload, User, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { getProfile, updateProfile, createProfile } from '../services/profile';
import { uploadImage } from '../services/storage';
import type { Profile, ProfileFormData } from '../types';

export function ProfileManager() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [form, setForm] = useState<ProfileFormData>({
    name: '', role: '', bio: '', about: '', avatar_url: '', resume_url: '', email: '', github: '', linkedin: '', facebook: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getProfile().then(p => {
      setProfile(p);
      if (p) setForm({
        name: p.name, role: p.role, bio: p.bio || '', about: p.about || '',
        avatar_url: p.avatar_url || '', resume_url: p.resume_url || '',
        email: p.email || '', github: p.github || '', linkedin: p.linkedin || '', facebook: p.facebook || '',
      });
    }).catch(() => toast.error('Failed to load profile')).finally(() => setLoading(false));
  }, []);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) { toast.error('Please upload an image file'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB'); return; }
    setUploading(true);
    try {
      const url = await uploadImage(file, 'avatars');
      setForm(f => ({ ...f, avatar_url: url }));
      toast.success('Image uploaded');
    } catch (err: any) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

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
        {/* Avatar drag & drop */}
        <div className="mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 block">Profile Picture</label>
          <div className="flex items-start gap-5">
            {/* Preview */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-primary-500/10 flex items-center justify-center border-2 border-slate-200 dark:border-white/10">
                {form.avatar_url ? (
                  <img src={form.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-primary-500/50" />
                )}
              </div>
              {form.avatar_url && (
                <button
                  onClick={() => setForm(f => ({ ...f, avatar_url: '' }))}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex-1 h-24 rounded-xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center gap-1.5 transition-colors select-none
                ${isDragging
                  ? 'border-primary-500 bg-primary-500/10'
                  : 'border-slate-300 dark:border-white/15 hover:border-primary-400 hover:bg-primary-500/5'
                }
                ${uploading ? 'pointer-events-none opacity-60' : ''}
              `}
            >
              <Upload className={`w-5 h-5 ${isDragging ? 'text-primary-500' : 'text-slate-400'}`} />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {uploading ? 'Uploading...' : 'Drop image here or click to browse'}
              </p>
              <p className="text-xs text-slate-400">PNG, JPG, WEBP · max 5MB</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f); e.target.value = ''; }}
            />
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
          <Input label="Resume URL" value={form.resume_url || ''} onChange={e => setForm({ ...form, resume_url: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="GitHub URL" value={form.github || ''} onChange={e => setForm({ ...form, github: e.target.value })} />
            <Input label="LinkedIn URL" value={form.linkedin || ''} onChange={e => setForm({ ...form, linkedin: e.target.value })} />
          </div>
          <Input label="Facebook URL" value={form.facebook || ''} onChange={e => setForm({ ...form, facebook: e.target.value })} placeholder="https://facebook.com/yourprofile" />


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
