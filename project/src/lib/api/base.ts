import { supabase } from '../supabase';

export function createCrudApi<T extends { id: string; created_at: string }>(tableName: string) {
  return {
    async getAll(): Promise<T[]> {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('sort_order');

      if (error) throw error;
      return data || [];
    },

    async getById(id: string): Promise<T | null> {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },

    async create(item: Omit<T, 'id' | 'created_at'>): Promise<T> {
      const { data, error } = await supabase
        .from(tableName)
        .insert([item])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async insertMany(items: Omit<T, 'id' | 'created_at'>[]): Promise<T[]> {
      const { data, error } = await supabase
        .from(tableName)
        .insert(items)
        .select();

      if (error) throw error;
      return data || [];
    },

    async update(id: string, item: Partial<Omit<T, 'id' | 'created_at'>>): Promise<T> {
      const { data, error } = await supabase
        .from(tableName)
        .update(item)
        .eq('id', id)
        .select()
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error(`No ${tableName} found with that ID`);
      return data;
    },

    async delete(id: string): Promise<void> {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;
    }
  };
}