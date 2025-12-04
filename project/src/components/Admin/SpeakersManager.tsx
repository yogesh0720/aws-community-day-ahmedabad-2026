import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Speaker } from '../../lib/supabase';
import { speakersApi } from '../../lib/api';

interface SpeakersManagerProps {
  speakers: Speaker[];
  onUpdate: (speakers: Speaker[]) => void;
}

export function SpeakersManager({ speakers, onUpdate }: SpeakersManagerProps) {
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [addingSpeaker, setAddingSpeaker] = useState(false);

  const deleteSpeaker = async (id: string) => {
    if (confirm('Are you sure you want to delete this speaker?')) {
      try {
        await speakersApi.delete(id);
        onUpdate(speakers.filter(s => s.id !== id));
      } catch (error) {
        alert('Failed to delete speaker');
      }
    }
  };

  const updateSpeaker = async (speaker: Speaker) => {
    try {
      const updated = await speakersApi.update(speaker.id, {
        name: speaker.name,
        organization: speaker.organization,
        talk_title: speaker.talk_title
      });
      onUpdate(speakers.map(s => s.id === speaker.id ? updated : s));
      setEditingSpeaker(null);
    } catch (error) {
      alert('Failed to update speaker');
    }
  };

  const addSpeaker = async (speaker: Omit<Speaker, 'id' | 'created_at'>) => {
    try {
      const newSpeaker = await speakersApi.create(speaker);
      onUpdate([newSpeaker, ...speakers]);
      setAddingSpeaker(false);
    } catch (error) {
      alert('Failed to add speaker');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Manage Speakers</h2>
        <button 
          onClick={() => setAddingSpeaker(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Speaker
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Talk Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {speakers.map((speaker) => (
              <tr key={speaker.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{speaker.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{speaker.organization}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{speaker.talk_title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setEditingSpeaker(speaker)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteSpeaker(speaker.id)}
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
      {editingSpeaker && (
        <EditSpeakerModal 
          speaker={editingSpeaker}
          onSave={updateSpeaker}
          onCancel={() => setEditingSpeaker(null)}
        />
      )}

      {/* Add Modal */}
      {addingSpeaker && (
        <AddSpeakerModal 
          onSave={addSpeaker}
          onCancel={() => setAddingSpeaker(false)}
        />
      )}
    </div>
  );
}

function EditSpeakerModal({ speaker, onSave, onCancel }: {
  speaker: Speaker;
  onSave: (speaker: Speaker) => void;
  onCancel: () => void;
}) {
  const [editedSpeaker, setEditedSpeaker] = useState(speaker);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Edit Speaker</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={editedSpeaker.name}
            onChange={(e) => setEditedSpeaker({...editedSpeaker, name: e.target.value})}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={editedSpeaker.organization}
            onChange={(e) => setEditedSpeaker({...editedSpeaker, organization: e.target.value})}
            placeholder="Organization"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={editedSpeaker.talk_title}
            onChange={(e) => setEditedSpeaker({...editedSpeaker, talk_title: e.target.value})}
            placeholder="Talk Title"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => onSave(editedSpeaker)}
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

function AddSpeakerModal({ onSave, onCancel }: {
  onSave: (speaker: Omit<Speaker, 'id' | 'created_at'>) => void;
  onCancel: () => void;
}) {
  const [speaker, setSpeaker] = useState({
    name: '',
    title: '',
    organization: '',
    talk_title: '',
    abstract: '',
    bio: '',
    photo_url: '',
    linkedin_url: '',
    twitter_url: '',
    github_url: '',
    talk_length_minutes: 45,
    sort_order: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(speaker);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Add New Speaker</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={speaker.name}
            onChange={(e) => setSpeaker({...speaker, name: e.target.value})}
            placeholder="Name *"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={speaker.title}
            onChange={(e) => setSpeaker({...speaker, title: e.target.value})}
            placeholder="Title *"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={speaker.organization}
            onChange={(e) => setSpeaker({...speaker, organization: e.target.value})}
            placeholder="Organization *"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={speaker.talk_title}
            onChange={(e) => setSpeaker({...speaker, talk_title: e.target.value})}
            placeholder="Talk Title *"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            value={speaker.abstract}
            onChange={(e) => setSpeaker({...speaker, abstract: e.target.value})}
            placeholder="Abstract *"
            className="w-full p-2 border rounded h-20"
            required
          />
          <div className="flex gap-2 mt-6">
            <button
              type="submit"
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              Add Speaker
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