import { useEffect, useRef, useState } from 'react';
import { Plus, Pencil, Trash2, ExternalLink, Github, Star, Upload, X } from 'lucide-react';
import { uploadImage } from '../services/storage';
import toast from 'react-hot-toast';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input, Textarea } from '../components/ui/Input';
import { getProjects, createProject, updateProject, deleteProject } from '../services/projects';
import type { Project, ProjectFormData } from '../types';

const emptyForm: ProjectFormData = {
  title: '', description: '', image_url: '', images: [], tech_stack: [],
  live_url: '', github_url: '', featured: false, sort_order: 0,
};

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<ProjectFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [techInput, setTechInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList | File[]) => {
    const arr = Array.from(files);
    const valid = arr.filter(f => f.type.startsWith('image/') && f.size <= 5 * 1024 * 1024);
    if (valid.length < arr.length) toast.error('Some files skipped (not image or >5MB)');
    if (!valid.length) return;
    setUploading(true);
    try {
      const urls = await Promise.all(valid.map(f => uploadImage(f, 'projects')));
      setForm(f => ({ ...f, images: [...(f.images ?? []), ...urls] }));
      toast.success(`${urls.length} image(s) uploaded`);
    } catch (err: any) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setForm(f => ({ ...f, images: (f.images ?? []).filter((_, i) => i !== index) }));
  };

  const load = () => {
    setLoading(true);
    getProjects().then(setProjects).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setTechInput(''); setModalOpen(true); };
  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({ title: p.title, description: p.description || '', image_url: p.image_url || '', images: p.images ?? [], tech_stack: p.tech_stack, live_url: p.live_url || '', github_url: p.github_url || '', featured: p.featured, sort_order: p.sort_order });
    setTechInput(p.tech_stack.join(', '));
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    setSaving(true);
    try {
      const data = { ...form, tech_stack: techInput.split(',').map(s => s.trim()).filter(Boolean) };
      if (editing) { await updateProject(editing.id, data); toast.success('Project updated'); }
      else { await createProject(data); toast.success('Project created'); }
      setModalOpen(false);
      load();
    } catch (err: any) { toast.error(err.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try { await deleteProject(id); toast.success('Project deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Projects</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your portfolio projects</p>
        </div>
        <Button onClick={openCreate}><Plus className="w-4 h-4" /> Add Project</Button>
      </div>

      <div className="grid gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <div key={i} className="animate-pulse h-24 rounded-2xl bg-slate-200 dark:bg-white/5" />)
        ) : projects.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-slate-500 dark:text-slate-400">No projects yet. Click "Add Project" to get started.</p>
          </Card>
        ) : (
          projects.map((p) => (
            <Card key={p.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white truncate">{p.title}</h3>
                    {p.featured && <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />}
                    {p.images?.length > 0 && <span className="text-xs text-slate-400">{p.images.length} รูป</span>}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 mb-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech_stack.map(t => (
                      <span key={t} className="px-2 py-0.5 text-xs rounded-md bg-primary-500/10 text-primary-600 dark:text-primary-400">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-2">
                    {p.live_url && <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-primary-500 flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Live</a>}
                    {p.github_url && <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-primary-500 flex items-center gap-1"><Github className="w-3 h-3" /> Code</a>}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-primary-500 transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Project' : 'New Project'} size="lg">
        <div className="space-y-4">
          <Input label="Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Project name" />
          <Textarea label="Description" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief description..." />

          {/* Multi-image upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Images {form.images?.length > 0 && <span className="text-primary-500">({form.images.length})</span>}
            </label>

            {/* Thumbnails */}
            {form.images?.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {form.images.map((url, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 flex-shrink-0">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button onClick={() => removeImage(i)} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                    {i === 0 && <span className="absolute bottom-0 left-0 right-0 text-center text-[9px] bg-primary-500 text-white py-0.5">Cover</span>}
                  </div>
                ))}
              </div>
            )}

            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={e => { e.preventDefault(); setIsDragging(false); handleUpload(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
              className={`h-28 rounded-xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center gap-2 transition-colors
                ${isDragging ? 'border-primary-500 bg-primary-500/10' : 'border-slate-300 dark:border-white/15 hover:border-primary-400 hover:bg-primary-500/5'}
                ${uploading ? 'pointer-events-none opacity-60' : ''}`}
            >
              <Upload className={`w-5 h-5 ${isDragging ? 'text-primary-500' : 'text-slate-400'}`} />
              <p className="text-sm text-slate-500 dark:text-slate-400">{uploading ? 'Uploading...' : 'Drop images here or click to browse'}</p>
              <p className="text-xs text-slate-400">รองรับหลายไฟล์ · PNG, JPG, WEBP · max 5MB</p>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => { if (e.target.files) handleUpload(e.target.files); e.target.value = ''; }} />
          </div>

          <Input label="Tech Stack (comma-separated)" value={techInput} onChange={e => setTechInput(e.target.value)} placeholder="React, TypeScript, Node.js" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Live URL" value={form.live_url || ''} onChange={e => setForm({ ...form, live_url: e.target.value })} placeholder="https://..." />
            <Input label="GitHub URL" value={form.github_url || ''} onChange={e => setForm({ ...form, github_url: e.target.value })} placeholder="https://github.com/..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Sort Order" type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Featured</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} loading={saving}>{editing ? 'Update' : 'Create'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
