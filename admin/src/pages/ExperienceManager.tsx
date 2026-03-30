import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, MapPin, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input, Textarea } from '../components/ui/Input';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../services/experience';
import { formatDate } from '../utils/helpers';
import type { Experience, ExperienceFormData } from '../types';

const emptyForm: ExperienceFormData = { title: '', company: '', location: '', start_date: '', end_date: '', description: '', is_current: false, sort_order: 0 };

export function ExperienceManager() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState<ExperienceFormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => { setLoading(true); getExperiences().then(setItems).catch(() => toast.error('Failed')).finally(() => setLoading(false)); };
  useEffect(load, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (e: Experience) => {
    setEditing(e);
    setForm({ title: e.title, company: e.company, location: e.location || '', start_date: e.start_date, end_date: e.end_date || '', description: e.description || '', is_current: e.is_current, sort_order: e.sort_order });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.company.trim() || !form.start_date) { toast.error('Title, company, and start date required'); return; }
    setSaving(true);
    try {
      const data = { ...form, end_date: form.is_current ? null : (form.end_date || null) };
      if (editing) { await updateExperience(editing.id, data); toast.success('Updated'); }
      else { await createExperience(data as ExperienceFormData); toast.success('Created'); }
      setModalOpen(false); load();
    } catch (err: any) { toast.error(err.message || 'Failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    try { await deleteExperience(id); toast.success('Deleted'); load(); } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Experience</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your work history</p>
        </div>
        <Button onClick={openCreate}><Plus className="w-4 h-4" /> Add Experience</Button>
      </div>

      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <div key={i} className="animate-pulse h-28 rounded-2xl bg-slate-200 dark:bg-white/5" />)
        ) : items.length === 0 ? (
          <Card className="p-12 text-center"><p className="text-slate-500">No experience added.</p></Card>
        ) : (
          items.map(e => (
            <Card key={e.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{e.title}</h3>
                    {e.is_current && <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">Current</span>}
                  </div>
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{e.company}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {e.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.location}</span>}
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(e.start_date)} — {e.is_current ? 'Present' : e.end_date ? formatDate(e.end_date) : 'N/A'}</span>
                  </div>
                  {e.description && <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{e.description}</p>}
                </div>
                <div className="flex gap-0.5 flex-shrink-0">
                  <button onClick={() => openEdit(e)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-primary-500"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(e.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Experience' : 'New Experience'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Job Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Senior Developer" />
            <Input label="Company *" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="TechCorp" />
          </div>
          <Input label="Location" value={form.location || ''} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Remote" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date *" type="date" value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} />
            <Input label="End Date" type="date" value={form.end_date || ''} onChange={e => setForm({ ...form, end_date: e.target.value })} disabled={form.is_current} />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_current} onChange={e => setForm({ ...form, is_current: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Currently working here</span>
          </label>
          <Textarea label="Description" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe your responsibilities..." />
          <Input label="Sort Order" type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} loading={saving}>{editing ? 'Update' : 'Create'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
