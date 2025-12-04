import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Volunteer } from '../../lib/supabase';
import { volunteersApi } from '../../lib/api';

interface VolunteersManagerProps {
  volunteers: Volunteer[];
  onUpdate: (volunteers: Volunteer[]) => void;
}

export function VolunteersManager({ volunteers, onUpdate }: VolunteersManagerProps) {
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(null);
  const [addingVolunteer, setAddingVolunteer] = useState(false);

  const deleteVolunteer = async (id: string) => {
    if (confirm('Are you sure you want to delete this volunteer?')) {
      try {
        await volunteersApi.delete(id);
        onUpdate(volunteers.filter(v => v.id !== id));
      } catch (error) {
        alert('Failed to delete volunteer');
      }
    }
  };

  const updateVolunteer = async (volunteer: Volunteer) => {
    try {
      const updated = await volunteersApi.update(volunteer.id, {
        name: volunteer.name,
        email: volunteer.email,
        role: volunteer.role
      });
      onUpdate(volunteers.map(v => v.id === volunteer.id ? updated : v));
      setEditingVolunteer(null);
    } catch (error) {
      alert('Failed to update volunteer');
    }
  };

  const addVolunteer = async (volunteer: Omit<Volunteer, 'id' | 'created_at'>) => {
    try {
      const newVolunteer = await volunteersApi.create(volunteer);
      onUpdate([newVolunteer, ...volunteers]);
      setAddingVolunteer(false);
    } catch (error) {
      alert('Failed to add volunteer');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Manage Volunteers</h2>
        <button 
          onClick={() => setAddingVolunteer(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Volunteer
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {volunteers.map((volunteer) => (
              <tr key={volunteer.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{volunteer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{volunteer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{volunteer.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setEditingVolunteer(volunteer)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteVolunteer(volunteer.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingVolunteer && (
        <EditVolunteerModal 
          volunteer={editingVolunteer}
          onSave={updateVolunteer}
          onCancel={() => setEditingVolunteer(null)}
        />
      )}

      {/* Add Modal */}
      {addingVolunteer && (
        <AddVolunteerModal 
          onSave={addVolunteer}
          onCancel={() => setAddingVolunteer(false)}
        />
      )}
    </div>
  );
}

function EditVolunteerModal({ volunteer, onSave, onCancel }: {
  volunteer: Volunteer;
  onSave: (volunteer: Volunteer) => void;
  onCancel: () => void;
}) {
  const [editedVolunteer, setEditedVolunteer] = useState(volunteer);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Edit Volunteer</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={editedVolunteer.name}
            onChange={(e) => setEditedVolunteer({...editedVolunteer, name: e.target.value})}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            value={editedVolunteer.email}
            onChange={(e) => setEditedVolunteer({...editedVolunteer, email: e.target.value})}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={editedVolunteer.role}
            onChange={(e) => setEditedVolunteer({...editedVolunteer, role: e.target.value})}
            placeholder="Role"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => onSave(editedVolunteer)}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function AddVolunteerModal({ onSave, onCancel }: {
  onSave: (volunteer: Omit<Volunteer, 'id' | 'created_at'>) => void;
  onCancel: () => void;
}) {
  const [volunteer, setVolunteer] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    experience_level: '',
    availability: [] as string[],
    motivation: '',
    photo_url: '',
    linkedin_url: '',
    twitter_url: '',
    github_url: '',
    sort_order: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(volunteer);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Add New Volunteer</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={volunteer.name}
            onChange={(e) => setVolunteer({...volunteer, name: e.target.value})}
            placeholder="Name *"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            value={volunteer.email}
            onChange={(e) => setVolunteer({...volunteer, email: e.target.value})}
            placeholder="Email *"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={volunteer.role}
            onChange={(e) => setVolunteer({...volunteer, role: e.target.value})}
            placeholder="Role *"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            value={volunteer.motivation}
            onChange={(e) => setVolunteer({...volunteer, motivation: e.target.value})}
            placeholder="Motivation *"
            className="w-full p-2 border rounded h-20"
            required
          />
          <div className="flex gap-2 mt-6">
            <button
              type="submit"
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              Add Volunteer
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}