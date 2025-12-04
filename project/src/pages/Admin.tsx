import { useState, useEffect } from 'react';
import { Users, UserCheck, Settings, LogOut } from 'lucide-react';
import { speakersApi, volunteersApi } from '../lib/api';
import { Speaker, Volunteer } from '../lib/supabase';
import { adminAuth } from '../lib/auth';
import { AdminLogin } from '../components/Admin/AdminLogin';
import { SpeakersManager } from '../components/Admin/SpeakersManager';
import { VolunteersManager } from '../components/Admin/VolunteersManager';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('speakers');
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);


  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const isAdmin = await adminAuth.isAdmin();
      setIsAuthenticated(isAdmin);
      if (isAdmin) {
        loadData();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    loadData();
  };

  const handleLogout = async () => {
    await adminAuth.logout();
    setIsAuthenticated(false);
    setSpeakers([]);
    setVolunteers([]);
  };

  const loadData = async () => {
    try {
      const [speakersData, volunteersData] = await Promise.all([
        speakersApi.getAll(),
        volunteersApi.getAll()
      ]);
      setSpeakers(speakersData);
      setVolunteers(volunteersData);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };



  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Speakers</p>
                <p className="text-2xl font-bold text-gray-900">{speakers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <UserCheck className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Volunteers</p>
                <p className="text-2xl font-bold text-gray-900">{volunteers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Settings className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Admin Panel</p>
                <p className="text-2xl font-bold text-gray-900">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('speakers')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'speakers'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Speakers ({speakers.length})
              </button>
              <button
                onClick={() => setActiveTab('volunteers')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'volunteers'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Volunteers ({volunteers.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'speakers' && (
              <SpeakersManager 
                speakers={speakers}
                onUpdate={setSpeakers}
              />
            )}

            {activeTab === 'volunteers' && (
              <VolunteersManager 
                volunteers={volunteers}
                onUpdate={setVolunteers}
              />
            )}
          </div>
        </div>
      </div>



    </div>
  );
}