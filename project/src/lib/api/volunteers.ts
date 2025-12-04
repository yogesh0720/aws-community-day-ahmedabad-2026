import { supabase, Volunteer } from '../supabase';
import { createCrudApi } from './base';

const baseCrud = createCrudApi<Volunteer>('volunteers');

export const volunteersApi = {
  ...baseCrud,
  
  async upsert(volunteer: Omit<Volunteer, 'id' | 'created_at'>): Promise<Volunteer> {
    const { data, error } = await supabase
      .from('volunteers')
      .upsert([volunteer], { onConflict: 'email' })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};