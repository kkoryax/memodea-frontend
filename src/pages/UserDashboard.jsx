import { useAuth } from "../../context/AuthContext"
import { useEffect, useState } from "react";
import axios from "axios";
import Note from "../components/Note";

export default function UserDashboard() {
    const { user } = useAuth();

    const [notes, setNotes] = useState([]);
    const [loadingNotes, setLoadingNotes] = useState(true);
    const [error, setError] = useState("");

    const fetchNotes = async () => {
        try {
          const response = await axios.get("http://localhost:3000/mongo/get-all-notes", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          console.log(response.data.notes) //check return object
          setNotes(response.data.notes || []);
        } catch (err) {
          console.error(err);
          setError("Failed to load notes.");
        } finally {
          setLoadingNotes(false);
        }
      };

      useEffect(() => {
        fetchNotes();
      }, []);

    return (
        <main className="min-h-screen bg-background-a30 flex flex-col">
            <div className="p-[5%]">
                <h2 className="text-white text-3xl">Welcome back,
                    <span className="font-bold"> {user.user.name}</span> !
                </h2>

                {Array.isArray(notes) && notes.length === 0 ?
                (
                    <p className="text-white">You have no notes yet. Start writing!</p>
                ) :
                (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note) => (
                        <Note key={note._id} note={note} />
                    ))}
                    </div>
                )}
                </div>
        </main>
    )
}