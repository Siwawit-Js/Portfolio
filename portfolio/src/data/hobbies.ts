import { Tv2, Music2, Gamepad2, Coffee } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Hobby {
  icon: LucideIcon;
  label: string;
  value: string;
}

export const HOBBIES: Hobby[] = [
  { icon: Tv2, label: '20+', value: 'Movies' },
  { icon: Music2, label: '1000+', value: 'Music' },
  { icon: Gamepad2, label: '20+', value: 'Gaming' },
  { icon: Coffee, label: '∞', value: 'Tea' },
];
