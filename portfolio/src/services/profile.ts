import { PROFILE } from '../data/profile';
import type { Profile } from '../types';

export async function getProfile(): Promise<Profile | null> {
  return PROFILE;
}
