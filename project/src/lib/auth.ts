import { supabase } from './supabase';
import bcrypt from 'bcryptjs';

const ADMIN_SESSION_KEY = 'admin_session';

export const adminAuth = {
  async login(email: string, password: string) {
    try {
      // Get admin user by email
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('role', 'admin')
        .single();

      if (error || !data) {
        return { data: null, error: { message: 'Invalid credentials' } };
      }

      // Verify password hash
      const isValidPassword = await bcrypt.compare(password, data.password_hash);
      if (!isValidPassword) {
        return { data: null, error: { message: 'Invalid credentials' } };
      }

      // Store minimal session data in localStorage
      const sessionData = {
        id: data.id,
        email: data.email,
        role: data.role,
        loginTime: Date.now()
      };
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));
      return { data: sessionData, error: null };
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
  },

  async isSessionValid() {
    const user = await this.getUser();
    if (!user || !user.loginTime) return false;
    
    // Session expires after 24 hours
    const sessionAge = Date.now() - user.loginTime;
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (sessionAge > maxAge) {
      await this.logout();
      return false;
    }
    
    return true;
  }
};