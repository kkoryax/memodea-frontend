import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const CreateNote = ({ onNoteAdded }) => {
  const [title, setTitle] = useState("");
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newNote = await axios.post("https://memodea-backend.onrender.com/mongo/add-note",{
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
        isPinned,
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      });
      setTitle("");
      setContent("");
      setTags("");
      setIsPinned(false);
      if (onNoteAdded) onNoteAdded(newNote);
    } catch (err) {
      console.error("Failed to create note:", err);
      setError("Failed to create note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4 ">
      <h1 className="text-2xl font-bold mb-6 flex justify-center">Write down your memories</h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-md bg-background-a20"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Content</label>
          <textarea
            className="w-full border px-3 py-2 rounded-md min-h-[150px] bg-background-a20"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-md bg-background-a20"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPinned"
            checked={isPinned}
            onChange={(e) => setIsPinned(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="isPinned" className="font-medium">
            Pin this note
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-button-a20 font-semibold text-white py-2 rounded-md hover:cursor-pointer hover:opacity-70 transition"
        >
          {loading ? "Saving..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
