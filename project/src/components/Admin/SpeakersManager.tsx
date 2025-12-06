import { useState } from "react";
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Speaker } from "../../lib/supabase";
import { speakersApi } from "../../lib/api";

interface SpeakersManagerProps {
  speakers: Speaker[];
  onUpdate: (speakers: Speaker[]) => void;
}

const PAGE_SIZE = 10;

export function SpeakersManager({ speakers, onUpdate }: SpeakersManagerProps) {
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [addingSpeaker, setAddingSpeaker] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSpeakers = speakers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.talk_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSpeakers.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const displayedSpeakers = filteredSpeakers.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const deleteSpeaker = async (id: string) => {
    if (confirm("Are you sure you want to delete this speaker?")) {
      try {
        await speakersApi.delete(id);
        onUpdate(speakers.filter((s) => s.id !== id));
      } catch (error) {
        console.error("Delete speaker error:", error);
        alert(
          `Failed to delete speaker: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }
  };

  const deleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (confirm(`Delete ${selectedIds.length} selected speakers?`)) {
      try {
        await Promise.all(selectedIds.map((id) => speakersApi.delete(id)));
        onUpdate(speakers.filter((s) => !selectedIds.includes(s.id)));
        setSelectedIds([]);
      } catch (error) {
        console.error("Delete speakers error:", error);
        alert(
          `Failed to delete speakers: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds((prev) =>
      prev.length === filteredSpeakers.length
        ? []
        : filteredSpeakers.map((s) => s.id)
    );
  };

  const updateSpeaker = async (speaker: Speaker) => {
    try {
      const updated = await speakersApi.update(speaker.id, {
        name: speaker.name,
        title: speaker.title,
        organization: speaker.organization,
        talk_title: speaker.talk_title,
        abstract: speaker.abstract,
        //bio: speaker.bio,
        photo_url: speaker.photo_url,
        linkedin_url: speaker.linkedin_url,
        // twitter_url: speaker.twitter_url,
        // github_url: speaker.github_url,
        talk_length_minutes: speaker.talk_length_minutes,
      });
      onUpdate(speakers.map((s) => (s.id === speaker.id ? updated : s)));
      setEditingSpeaker(null);
    } catch (error) {
      console.error("Update speaker error:", error);
      alert(
        `Failed to update speaker: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const addSpeaker = async (speaker: Omit<Speaker, "id" | "created_at">) => {
    try {
      const newSpeaker = await speakersApi.create(speaker);
      onUpdate([newSpeaker, ...speakers]);
      setAddingSpeaker(false);
    } catch (error) {
      console.error("Add speaker error:", error);
      alert(
        `Failed to add speaker: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Manage Speakers</h2>
          <div className="flex gap-2">
            {selectedIds.length > 0 && (
              <button
                onClick={deleteSelected}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete ({selectedIds.length})
              </button>
            )}
            <button
              onClick={() => setAddingSpeaker(true)}
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Speaker
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search speakers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedIds.length === filteredSpeakers.length &&
                    filteredSpeakers.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="rounded"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Photo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Organization
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Talk Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedSpeakers.map((speaker) => (
              <tr key={speaker.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(speaker.id)}
                    onChange={() => toggleSelect(speaker.id)}
                    className="rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {speaker.photo_url ? (
                    <img
                      src={speaker.photo_url}
                      alt={speaker.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-sm font-medium">
                        {speaker.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {speaker.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {speaker.organization}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {speaker.talk_title}
                </td>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-700">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + PAGE_SIZE, filteredSpeakers.length)} of{" "}
              {filteredSpeakers.length} speakers
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-3 py-1 text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
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

function EditSpeakerModal({
  speaker,
  onSave,
  onCancel,
}: {
  speaker: Speaker;
  onSave: (speaker: Speaker) => void;
  onCancel: () => void;
}) {
  const [editedSpeaker, setEditedSpeaker] = useState(speaker);
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { uploadSpeakerPhoto } = await import("../../lib/storage");
      const photoUrl = await uploadSpeakerPhoto(file, speaker.id);
      setEditedSpeaker({ ...editedSpeaker, photo_url: photoUrl });
    } catch (error) {
      console.error("Photo upload error:", error);
      alert(
        `Failed to upload photo: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Edit Speaker</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={editedSpeaker.name}
            onChange={(e) =>
              setEditedSpeaker({ ...editedSpeaker, name: e.target.value })
            }
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={editedSpeaker.title}
            onChange={(e) =>
              setEditedSpeaker({ ...editedSpeaker, title: e.target.value })
            }
            placeholder="Title"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={editedSpeaker.organization}
            onChange={(e) =>
              setEditedSpeaker({
                ...editedSpeaker,
                organization: e.target.value,
              })
            }
            placeholder="Organization"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={editedSpeaker.talk_title}
            onChange={(e) =>
              setEditedSpeaker({ ...editedSpeaker, talk_title: e.target.value })
            }
            placeholder="Talk Title"
            className="w-full p-2 border rounded"
          />
          <textarea
            value={editedSpeaker.abstract}
            onChange={(e) =>
              setEditedSpeaker({ ...editedSpeaker, abstract: e.target.value })
            }
            placeholder="Abstract"
            className="w-full p-2 border rounded h-20"
          />
          {/* <textarea
            value={editedSpeaker.bio}
            onChange={(e) =>
              setEditedSpeaker({ ...editedSpeaker, bio: e.target.value })
            }
            placeholder="Bio"
            className="w-full p-2 border rounded h-20"
          /> */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo
            </label>
            {editedSpeaker.photo_url && (
              <img
                src={editedSpeaker.photo_url}
                alt="Profile"
                className="w-16 h-16 rounded-full mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              disabled={uploading}
              className="w-full p-2 border rounded"
            />
            <p className="text-xs text-gray-500 mt-1">Max size: 50KB</p>
            {uploading && (
              <p className="text-sm text-gray-500 mt-1">Uploading...</p>
            )}
          </div>
          <input
            type="url"
            value={editedSpeaker.photo_url || ""}
            onChange={(e) =>
              setEditedSpeaker({
                ...editedSpeaker,
                photo_url: e.target.value,
              })
            }
            placeholder="Photo URL"
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            value={editedSpeaker.linkedin_url || ""}
            onChange={(e) =>
              setEditedSpeaker({
                ...editedSpeaker,
                linkedin_url: e.target.value,
              })
            }
            placeholder="LinkedIn URL"
            className="w-full p-2 border rounded"
          />
          {/* <input
            type="url"
            value={editedSpeaker.twitter_url || ""}
            onChange={(e) =>
              setEditedSpeaker({
                ...editedSpeaker,
                twitter_url: e.target.value,
              })
            }
            placeholder="Twitter URL"
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            value={editedSpeaker.github_url || ""}
            onChange={(e) =>
              setEditedSpeaker({ ...editedSpeaker, github_url: e.target.value })
            }
            placeholder="GitHub URL"
            className="w-full p-2 border rounded"
          /> */}
          <input
            type="number"
            value={editedSpeaker.talk_length_minutes}
            onChange={(e) =>
              setEditedSpeaker({
                ...editedSpeaker,
                talk_length_minutes: parseInt(e.target.value) || 45,
              })
            }
            placeholder="Talk Length (minutes)"
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

function AddSpeakerModal({
  onSave,
  onCancel,
}: {
  onSave: (speaker: Omit<Speaker, "id" | "created_at">) => void;
  onCancel: () => void;
}) {
  const [speaker, setSpeaker] = useState({
    name: "",
    title: "",
    organization: "",
    talk_title: "",
    abstract: "",
    bio: "",
    photo_url: "",
    linkedin_url: "",
    twitter_url: "",
    github_url: "",
    talk_length_minutes: 45,
  });
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { uploadSpeakerPhoto } = await import("../../lib/storage");
      const tempId = `temp-${Date.now()}`;
      const photoUrl = await uploadSpeakerPhoto(file, tempId);
      setSpeaker({ ...speaker, photo_url: photoUrl });
    } catch (error) {
      console.error("Photo upload error:", error);
      alert(
        `Failed to upload photo: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setUploading(false);
    }
  };

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
            onChange={(e) => setSpeaker({ ...speaker, name: e.target.value })}
            placeholder="Name *"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={speaker.title}
            onChange={(e) => setSpeaker({ ...speaker, title: e.target.value })}
            placeholder="Title *"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={speaker.organization}
            onChange={(e) =>
              setSpeaker({ ...speaker, organization: e.target.value })
            }
            placeholder="Organization *"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={speaker.talk_title}
            onChange={(e) =>
              setSpeaker({ ...speaker, talk_title: e.target.value })
            }
            placeholder="Talk Title *"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            value={speaker.abstract}
            onChange={(e) =>
              setSpeaker({ ...speaker, abstract: e.target.value })
            }
            placeholder="Abstract *"
            className="w-full p-2 border rounded h-20"
            required
          />
          {/* <textarea
            value={speaker.bio}
            onChange={(e) => setSpeaker({ ...speaker, bio: e.target.value })}
            placeholder="Bio *"
            className="w-full p-2 border rounded h-20"
            required
          /> */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo
            </label>
            {speaker.photo_url && (
              <img
                src={speaker.photo_url}
                alt="Profile"
                className="w-16 h-16 rounded-full mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              disabled={uploading}
              className="w-full p-2 border rounded"
            />
            <p className="text-xs text-gray-500 mt-1">Max size: 50KB</p>
            {uploading && (
              <p className="text-sm text-gray-500 mt-1">Uploading...</p>
            )}
          </div>
          <input
            type="url"
            value={speaker.photo_url || ""}
            onChange={(e) =>
              setSpeaker({
                ...speaker,
                photo_url: e.target.value,
              })
            }
            placeholder="Photo URL"
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            value={speaker.linkedin_url}
            onChange={(e) =>
              setSpeaker({ ...speaker, linkedin_url: e.target.value })
            }
            placeholder="LinkedIn URL"
            className="w-full p-2 border rounded"
          />
          {/* <input
            type="url"
            value={speaker.twitter_url}
            onChange={(e) =>
              setSpeaker({ ...speaker, twitter_url: e.target.value })
            }
            placeholder="Twitter URL"
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            value={speaker.github_url}
            onChange={(e) =>
              setSpeaker({ ...speaker, github_url: e.target.value })
            }
            placeholder="GitHub URL"
            className="w-full p-2 border rounded"
          /> */}
          <input
            type="number"
            value={speaker.talk_length_minutes}
            onChange={(e) =>
              setSpeaker({
                ...speaker,
                talk_length_minutes: parseInt(e.target.value) || 45,
              })
            }
            placeholder="Talk Length (minutes)"
            className="w-full p-2 border rounded"
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
