import { supabase } from './supabase';

const ADMIN_SESSION_KEY = 'admin_session';

export const adminAuth = {
  async login(email: string, password: string) {
    try {
      // Check admin credentials in admin_users table
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .eq('role', 'admin')
        .single();

      if (error || !data) {
        return { data: null, error: { message: 'Invalid credentials' } };
      }

      // Store session in localStorage
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(data));
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Login failed' } };
    }
  },

  async logout() {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    return { error: null };
  },

  async getUser() {
    try {
      const session = localStorage.getItem(ADMIN_SESSION_KEY);
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  },

  async isAdmin() {
    const user = await this.getUser();
    return user && user.role === 'admin';
  }
};