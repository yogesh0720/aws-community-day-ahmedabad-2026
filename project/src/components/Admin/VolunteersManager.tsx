import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  GripVertical,
} from "lucide-react";
import { Volunteer } from "../../lib/supabase";
import { volunteersApi } from "../../lib/api";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface VolunteersManagerProps {
  volunteers: Volunteer[];
  onUpdate: (volunteers: Volunteer[]) => void;
}

const PAGE_SIZE = 10;

export function VolunteersManager({
  volunteers,
  onUpdate,
}: VolunteersManagerProps) {
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(
    null
  );
  const [addingVolunteer, setAddingVolunteer] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const sortedVolunteers = [...volunteers].sort(
    (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
  );

  const filteredVolunteers = sortedVolunteers.filter(
    (v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVolunteers.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const displayedVolunteers = filteredVolunteers.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = displayedVolunteers.findIndex((v) => v.id === active.id);
    const newIndex = displayedVolunteers.findIndex((v) => v.id === over.id);

    const reordered = arrayMove(displayedVolunteers, oldIndex, newIndex);

    try {
      await Promise.all(
        reordered.map((volunteer, index) =>
          volunteersApi.update(volunteer.id, {
            sort_order: startIndex + index + 1,
          })
        )
      );

      const updatedVolunteers = volunteers.map((v) => {
        const updated = reordered.find((r) => r.id === v.id);
        return updated
          ? { ...v, sort_order: reordered.indexOf(updated) + startIndex + 1 }
          : v;
      });

      onUpdate(updatedVolunteers);
    } catch (error) {
      console.error("Reorder error:", error);
      alert("Failed to update order");
    }
  };

  const deleteVolunteer = async (id: string) => {
    if (confirm("Are you sure you want to delete this volunteer?")) {
      try {
        await volunteersApi.delete(id);
        onUpdate(volunteers.filter((v) => v.id !== id));
      } catch (error) {
        console.error("Delete volunteer error:", error);
        alert(
          `Failed to delete volunteer: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }
  };

  const deleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (confirm(`Delete ${selectedIds.length} selected volunteers?`)) {
      try {
        await Promise.all(selectedIds.map((id) => volunteersApi.delete(id)));
        onUpdate(volunteers.filter((v) => !selectedIds.includes(v.id)));
        setSelectedIds([]);
      } catch (error) {
        console.error("Delete volunteers error:", error);
        alert(
          `Failed to delete volunteers: ${
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
      prev.length === filteredVolunteers.length
        ? []
        : filteredVolunteers.map((v) => v.id)
    );
  };

  const updateVolunteer = async (volunteer: Volunteer) => {
    try {
      const updated = await volunteersApi.update(volunteer.id, {
        name: volunteer.name,
        // email: volunteer.email,
        // phone: volunteer.phone,
        // role: volunteer.role,
        // experience_level: volunteer.experience_level,
        // availability: volunteer.availability,
        // motivation: volunteer.motivation,
        photo_url: volunteer.photo_url,
        linkedin_url: volunteer.linkedin_url,
        // twitter_url: volunteer.twitter_url,
        // github_url: volunteer.github_url,
      });
      onUpdate(volunteers.map((v) => (v.id === volunteer.id ? updated : v)));
      setEditingVolunteer(null);
    } catch (error) {
      console.error("Update volunteer error:", error);
      alert(
        `Failed to update volunteer: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const addVolunteer = async (
    volunteer: Omit<Volunteer, "id" | "created_at">
  ) => {
    try {
      const newVolunteer = await volunteersApi.create(volunteer);
      onUpdate([newVolunteer, ...volunteers]);
      setAddingVolunteer(false);
    } catch (error) {
      console.error("Add volunteer error:", error);
      alert(
        `Failed to add volunteer: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            Manage Volunteers
          </h2>
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
              onClick={() => setAddingVolunteer(true)}
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Volunteer
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search volunteers..."
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
                    selectedIds.length === filteredVolunteers.length &&
                    filteredVolunteers.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="rounded"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SortOrder
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Photo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                LinkedIn
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={displayedVolunteers.map((v) => v.id)}
              strategy={verticalListSortingStrategy}
            >
              <tbody className="bg-white divide-y divide-gray-200">
                {displayedVolunteers.map((volunteer) => (
                  <SortableRow
                    key={volunteer.id}
                    volunteer={volunteer}
                    isSelected={selectedIds.includes(volunteer.id)}
                    onToggleSelect={toggleSelect}
                    onEdit={setEditingVolunteer}
                    onDelete={deleteVolunteer}
                  />
                ))}
              </tbody>
            </SortableContext>
          </DndContext>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-700">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + PAGE_SIZE, filteredVolunteers.length)} of{" "}
              {filteredVolunteers.length} volunteers
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

function SortableRow({
  volunteer,
  isSelected,
  onToggleSelect,
  onEdit,
  onDelete,
}: {
  volunteer: Volunteer;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onEdit: (volunteer: Volunteer) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: volunteer.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr ref={setNodeRef} style={style} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(volunteer.id)}
          className="rounded"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing bg-grey-100 text-orange-700 hover:bg-orange-200 font-bold text-sm w-8 h-8 flex items-center justify-center rounded border-2 border-orange-300 hover:border-orange-400 shadow-sm"
        >
          {volunteer.sort_order || "-"}
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {volunteer.photo_url ? (
          <img
            src={volunteer.photo_url}
            alt={volunteer.name}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm font-medium">
              {volunteer.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {volunteer.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {volunteer.linkedin_url}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(volunteer)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(volunteer.id)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

function EditVolunteerModal({
  volunteer,
  onSave,
  onCancel,
}: {
  volunteer: Volunteer;
  onSave: (volunteer: Volunteer) => void;
  onCancel: () => void;
}) {
  const [editedVolunteer, setEditedVolunteer] = useState(volunteer);
  const [uploading, setUploading] = useState(false);

  const handleAvailabilityChange = (value: string) => {
    const availability = editedVolunteer.availability.includes(value)
      ? editedVolunteer.availability.filter((item) => item !== value)
      : [...editedVolunteer.availability, value];
    setEditedVolunteer({ ...editedVolunteer, availability });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { uploadVolunteerPhoto } = await import("../../lib/storage");
      const photoUrl = await uploadVolunteerPhoto(file, volunteer.id);
      setEditedVolunteer({ ...editedVolunteer, photo_url: photoUrl });
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
        <h3 className="text-lg font-bold mb-4">Edit Volunteer</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={editedVolunteer.name}
            onChange={(e) =>
              setEditedVolunteer({ ...editedVolunteer, name: e.target.value })
            }
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          {/* <input
            type="email"
            value={editedVolunteer.email}
            onChange={(e) =>
              setEditedVolunteer({ ...editedVolunteer, email: e.target.value })
            }
            placeholder="Email"
            className="w-full p-2 border rounded"
          /> */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo
            </label>
            {editedVolunteer.photo_url && (
              <img
                src={editedVolunteer.photo_url}
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
          {/* <input
            type="text"
            value={editedVolunteer.phone || ""}
            onChange={(e) =>
              setEditedVolunteer({ ...editedVolunteer, phone: e.target.value })
            }
            placeholder="Phone"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={editedVolunteer.role}
            onChange={(e) =>
              setEditedVolunteer({ ...editedVolunteer, role: e.target.value })
            }
            placeholder="Role"
            className="w-full p-2 border rounded"
          />
          <select
            value={editedVolunteer.experience_level || ""}
            onChange={(e) =>
              setEditedVolunteer({
                ...editedVolunteer,
                experience_level: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          >
            <option value="">Select Experience Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            {[
              "Event Day (Dec 13)",
              "Day Before (Dec 12)",
              "Day After (Dec 14)",
            ].map((option) => (
              <label key={option} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={editedVolunteer.availability.includes(option)}
                  onChange={() => handleAvailabilityChange(option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
          <textarea
            value={editedVolunteer.motivation}
            onChange={(e) =>
              setEditedVolunteer({
                ...editedVolunteer,
                motivation: e.target.value,
              })
            }
            placeholder="Motivation"
            className="w-full p-2 border rounded h-20"
          /> */}
          <input
            type="url"
            value={editedVolunteer.photo_url || ""}
            onChange={(e) =>
              setEditedVolunteer({
                ...editedVolunteer,
                photo_url: e.target.value,
              })
            }
            placeholder="Photo URL"
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            value={editedVolunteer.linkedin_url || ""}
            onChange={(e) =>
              setEditedVolunteer({
                ...editedVolunteer,
                linkedin_url: e.target.value,
              })
            }
            placeholder="LinkedIn URL"
            className="w-full p-2 border rounded"
          />
          {/* <input
            type="url"
            value={editedVolunteer.twitter_url || ""}
            onChange={(e) =>
              setEditedVolunteer({
                ...editedVolunteer,
                twitter_url: e.target.value,
              })
            }
            placeholder="Twitter URL"
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            value={editedVolunteer.github_url || ""}
            onChange={(e) =>
              setEditedVolunteer({
                ...editedVolunteer,
                github_url: e.target.value,
              })
            }
            placeholder="GitHub URL"
            className="w-full p-2 border rounded"
          /> */}
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

function AddVolunteerModal({
  onSave,
  onCancel,
}: {
  onSave: (volunteer: Omit<Volunteer, "id" | "created_at">) => void;
  onCancel: () => void;
}) {
  const [volunteer, setVolunteer] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience_level: "",
    availability: [] as string[],
    motivation: "",
    photo_url: "",
    linkedin_url: "",
    twitter_url: "",
    github_url: "",
  });
  const [uploading, setUploading] = useState(false);

  const handleAvailabilityChange = (value: string) => {
    const availability = volunteer.availability.includes(value)
      ? volunteer.availability.filter((item) => item !== value)
      : [...volunteer.availability, value];
    setVolunteer({ ...volunteer, availability });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { uploadVolunteerPhoto } = await import("../../lib/storage");
      const tempId = `temp-${Date.now()}`;
      const photoUrl = await uploadVolunteerPhoto(file, tempId);
      setVolunteer({ ...volunteer, photo_url: photoUrl });
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
            onChange={(e) =>
              setVolunteer({ ...volunteer, name: e.target.value })
            }
            placeholder="Name *"
            className="w-full p-2 border rounded"
            required
          />
          {/* <input
            type="email"
            value={volunteer.email}
            onChange={(e) =>
              setVolunteer({ ...volunteer, email: e.target.value })
            }
            placeholder="Email *"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={volunteer.phone}
            onChange={(e) =>
              setVolunteer({ ...volunteer, phone: e.target.value })
            }
            placeholder="Phone"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={volunteer.role}
            onChange={(e) =>
              setVolunteer({ ...volunteer, role: e.target.value })
            }
            placeholder="Role *"
            className="w-full p-2 border rounded"
            required
          /> */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo
            </label>
            {volunteer.photo_url && (
              <img
                src={volunteer.photo_url}
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
          {/* <select
            value={volunteer.experience_level}
            onChange={(e) =>
              setVolunteer({ ...volunteer, experience_level: e.target.value })
            }
            className="w-full p-2 border rounded"
          >
            <option value="">Select Experience Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            {[
              "Event Day (Dec 13)",
              "Day Before (Dec 12)",
              "Day After (Dec 14)",
            ].map((option) => (
              <label key={option} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={volunteer.availability.includes(option)}
                  onChange={() => handleAvailabilityChange(option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
          <textarea
            value={volunteer.motivation}
            onChange={(e) =>
              setVolunteer({ ...volunteer, motivation: e.target.value })
            }
            placeholder="Motivation *"
            className="w-full p-2 border rounded h-20"
            required
          /> */}
          <input
            type="url"
            value={volunteer.photo_url}
            onChange={(e) =>
              setVolunteer({ ...volunteer, photo_url: e.target.value })
            }
            placeholder="Photo URL"
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            value={volunteer.linkedin_url}
            onChange={(e) =>
              setVolunteer({ ...volunteer, linkedin_url: e.target.value })
            }
            placeholder="LinkedIn URL"
            className="w-full p-2 border rounded"
          />
          {/* <input
            type="url"
            value={volunteer.twitter_url}
            onChange={(e) =>
              setVolunteer({ ...volunteer, twitter_url: e.target.value })
            }
            placeholder="Twitter URL"
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            value={volunteer.github_url}
            onChange={(e) =>
              setVolunteer({ ...volunteer, github_url: e.target.value })
            }
            placeholder="GitHub URL"
            className="w-full p-2 border rounded"
          /> */}
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
