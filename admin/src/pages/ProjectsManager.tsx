import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ExternalLink, Github, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input, Textarea } from '../components/ui/Input';
import { getProjects, createProject, updateProject, deleteProject } from '../services/projects';
import type { Project, ProjectFormData } from '../types';

const emptyForm: ProjectFormData = {
  title: '', description: '', image_url: '', tech_stack: [],
  live_url: '', github_url: '', featured: false, sort_order: 0,
};

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<ProjectFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState('');

  const load = () => {
    setLoading(true);
    getProjects().then(setProjects).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setTechInput(''); setModalOpen(true); };
  const openEdit = (p: Project) => { setEditing(p); setForm({ title: p.title, description: p.description || '', image_url: p.image_url || '', tech_stack: p.tech_stack, live_url: p.live_url || '', github_url: p.github_url || '', featured: p.featured, sort_order: p.sort_order }); setTechInput(p.tech_stack.join(', ')); setModalOpen(true); };

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    setSaving(true);
    try {
      const data = { ...form, tech_stack: techInput.split(',').map(s => s.trim()).filter(Boolean) };
      if (editing) {
        await updateProject(editing.id, data);
        toast.success('Project updated');
      } else {
        await createProject(data);
        toast.success('Project created');
      }
      setModalOpen(false);
      load();
    } catch (err: any) {
      toast.error(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      toast.success('Project deleted');
      load();
    } catch { toast.error('Delete failed'); }
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

      {/* Projects list */}
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

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Project' : 'New Project'} size="lg">
        <div className="space-y-4">
          <Input label="Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Project name" />
          <Textarea label="Description" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief description..." />
          <Input label="Image URL" value={form.image_url || ''} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
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
