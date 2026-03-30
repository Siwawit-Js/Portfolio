import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../services/skills';
import type { Skill, SkillFormData } from '../types';

const emptyForm: SkillFormData = { name: '', category: 'Frontend', icon: '', proficiency: 80, sort_order: 0 };
const categories = ['Frontend', 'Backend', 'DevOps', 'Design', 'Mobile', 'Other'];

export function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState<SkillFormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => { setLoading(true); getSkills().then(setSkills).catch(() => toast.error('Failed to load')).finally(() => setLoading(false)); };
  useEffect(load, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (s: Skill) => { setEditing(s); setForm({ name: s.name, category: s.category, icon: s.icon || '', proficiency: s.proficiency, sort_order: s.sort_order }); setModalOpen(true); };

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('Name is required'); return; }
    setSaving(true);
    try {
      if (editing) { await updateSkill(editing.id, form); toast.success('Skill updated'); }
      else { await createSkill(form); toast.success('Skill created'); }
      setModalOpen(false); load();
    } catch (err: any) { toast.error(err.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    try { await deleteSkill(id); toast.success('Deleted'); load(); }
    catch { toast.error('Failed'); }
  };

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => { (acc[s.category] ??= []).push(s); return acc; }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Skills</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your skills and expertise</p>
        </div>
        <Button onClick={openCreate}><Plus className="w-4 h-4" /> Add Skill</Button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="animate-pulse h-20 rounded-2xl bg-slate-200 dark:bg-white/5" />)}
        </div>
      ) : skills.length === 0 ? (
        <Card className="p-12 text-center"><p className="text-slate-500">No skills yet.</p></Card>
      ) : (
        Object.entries(grouped).map(([cat, items]) => (
          <div key={cat}>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">{cat}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map(s => (
                <Card key={s.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 dark:text-white truncate">{s.name}</h4>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full">
                          <div className="h-full bg-gradient-to-r from-primary-500 to-accent-400 rounded-full" style={{ width: `${s.proficiency}%` }} />
                        </div>
                        <span className="text-xs text-slate-400">{s.proficiency}%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 ml-3">
                      <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-primary-500"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Skill' : 'New Skill'}>
        <div className="space-y-4">
          <Input label="Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="React" />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <Input label="Icon (lucide name)" value={form.icon || ''} onChange={e => setForm({ ...form, icon: e.target.value })} placeholder="code-2" />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Proficiency: {form.proficiency}%</label>
            <input type="range" min={0} max={100} value={form.proficiency} onChange={e => setForm({ ...form, proficiency: parseInt(e.target.value) })} className="w-full accent-primary-500" />
          </div>
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
