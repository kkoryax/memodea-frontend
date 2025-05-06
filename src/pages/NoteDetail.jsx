import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const NoteDetailsPage = () => {
  const { user } = useAuth();

  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    isPinned: false,
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await axios.get(`https://memodea-backend.onrender.com/mongo/get-note/${noteId}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
              }
        });
        console.log(data)
        setNote(data.data.note);
        setFormData({
          title: data.data.note.title,
          content: data.data.note.content,
          tags: data.data.note.tags.join(", "),
          isPinned: data.data.note.isPinned,
        });
      } catch (err) {
        console.error("Failed to fetch note:", err);
        setError("Failed to load note details.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglePin = () => {
    setFormData((prev) => ({ ...prev, isPinned: !prev.isPinned }));
  };

  const handleSaveNote = async () => {
    try {
      const updatedNote = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      };
      await axios.put(`https://memodea-backend.onrender.com/mongo/edit-note/${noteId}`, updatedNote,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
        }
      });
      setNote(updatedNote);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save note:", err);
      setError("Failed to save note. Please try again.");
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <main className="bg-background-a30 h-screen overflow-hidden">
      <div className="mt-16 max-w-3xl mx-auto px-12 py-8 bg-white rounded-lg shadow-md flex">
        {isEditing ? (
          <div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded-md mb-4"
              placeholder="Title"
            />
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded-md mb-4 min-h-[150px]"
              placeholder="Content"
            ></textarea>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded-md mb-4"
              placeholder="Tags (comma-separated)"
            />
            <div className="flex items-center mb-4">
              <label className="mr-2">Pinned:</label>
              <input
                type="checkbox"
                checked={formData.isPinned}
                onChange={handleTogglePin}
              />
            </div>
            <button
              onClick={handleSaveNote}
              className=" bg-button-a10 text-white px-4 py-2 rounded-md hover:opacity-70 hover:cursor-pointer transition"
            >
              Save Note
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
            <p className="text-gray-700 mb-4">{note.content}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {note.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-background-a10 text-white text-xs font-medium px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
            {note.isPinned && (
              <div className="text-background-a10 text-sm font-bold">📌 Pinned</div>
            )}
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-button-a10 text-white px-4 py-2 rounded-md hover:opacity-70 hover:cursor-pointer transition"
            >
              Edit Note
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default NoteDetailsPage;
