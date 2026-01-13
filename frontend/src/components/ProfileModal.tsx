// frontend/src/components/ProfileModal.tsx
import { useState } from "react";
import { updateProfile, deleteProfile } from "../api/user.api";
import { useAuth } from "../context/AuthContext";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [name, setName] = useState("");
  const { logout } = useAuth();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(name);
      alert("Profile updated successfully!");
      onClose();
    } catch (error) {
      alert("Failed to update profile.");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible and will delete all your tasks.")) {
      try {
        await deleteProfile();
        alert("Account deleted successfully.");
        logout(); // Log the user out after deleting their account
      } catch (error) {
        alert("Failed to delete account.");
        console.error(error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              className="border p-2 w-full rounded-md"
              placeholder="Enter your new name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="text-gray-600 font-semibold">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold">Save Changes</button>
          </div>
        </form>
        <div className="border-t mt-6 pt-6">
          <h3 className="font-bold text-red-600">Danger Zone</h3>
          <p className="text-sm text-gray-600 my-2">Deleting your account is permanent and will remove all your data.</p>
          <button onClick={handleDelete} className="bg-red-600 text-white w-full p-2 rounded-md font-semibold">
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
}