import { PROFILE } from '../data/static';
import type { Profile } from '../types';

export async function getProfile(): Promise<Profile | null> {
  return PROFILE;
}
