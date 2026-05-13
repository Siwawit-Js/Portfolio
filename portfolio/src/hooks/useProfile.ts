import { useEffect, useState } from 'react';
import { getProfile } from '../services/profile';
import type { Profile } from '../types';

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  return profile;
}
