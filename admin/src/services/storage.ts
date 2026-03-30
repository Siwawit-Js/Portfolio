import { supabase } from '../lib/supabase';

export async function uploadImage(file: File, path: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${path}/${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage.from('portfolio-images').upload(fileName, file);
  if (error) throw error;

  const { data } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
  return data.publicUrl;
}

export async function deleteImage(url: string): Promise<void> {
  const path = url.split('/portfolio-images/')[1];
  if (!path) return;
  await supabase.storage.from('portfolio-images').remove([path]);
}
