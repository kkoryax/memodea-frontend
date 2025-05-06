import { useAuth } from "../../context/AuthContext"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Note from "../components/Note";
import CreateNote from "./CreateNote";

export default function UserDashboard() {
    const { user } = useAuth();

    const [searchParams] = useSearchParams();
    const [notes, setNotes] = useState([]);
    const [loadingNotes, setLoadingNotes] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchNotes = async () => {
        setLoadingNotes(true);
        setError("");
        const searchQuery = searchParams.get("search");

        try {
            if (searchQuery) {
                const response = await axios.get("https://memodea-backend.onrender.com/mongo/search-notes", {
                    params: { query: searchQuery },
                    headers: {
                      Authorization: `Bearer ${user.token}`,
                    }
                });
                /* console.log("Search results:", response.data); */
                setNotes(response.data.notes || []);
            } else {
                const response = await axios.get("https://memodea-backend.onrender.com/mongo/get-all-notes", {
                  headers: {
                    Authorization: `Bearer ${user.token}`,
                  }
                });
                /* console.log("All notes:", response.data.notes); */
                setNotes(response.data.notes || []);
            }
        } catch (err) {
          console.error(err);
          setError("Failed to load notes.");
        } finally {
          setLoadingNotes(false);
        }
      };

      const handleDeleteNote = async (noteId) => {
        try {
          await axios.delete(`https://memodea-backend.onrender.com/mongo/delete-note/${noteId}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            }
          });
          fetchNotes();
        } catch (err) {
          console.error("Failed to delete note:", err);
          setError("Failed to delete note.");
        }
      };

      useEffect(() => {
        fetchNotes();
      }, [searchParams]);

    return (
        <main className="min-h-screen bg-background-a30 flex flex-col">
            <div className="px-[5%] py-[5%] md:py-[2%] flex flex-col md:flex-row w-full justify-between gap-12">
                <div className="w-full md:w-1/3 mb-[5%]">
                    <h2 className="text-white text-3xl">Welcome back,
                        <span className="font-bold"> {user.user.name}</span> !
                    </h2>
                    <h2 className="text-white text-xl">{user.user.email}</h2>
                </div>
                <div className="-mt-12 md:mt-0 w-full md:w-2/3">
                    <article className="bg-background-a10 mb-6 rounded-2xl shadow-md p-4 flex flex-row gap-6">
                        <p className="text-white text-2xl font-bold">{user.user.name}</p>
                        <textarea
                                placeholder="Create a new note..."
                                onClick={() => setIsModalOpen(true)}
                                className=" bg-background-a40 text-white px-4 py-1 rounded-md w-full"
                        >
                        </textarea>
                    </article>

                    {isModalOpen && (
                        <div
                        className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50"
                        onClick={() => setIsModalOpen(false)}
                        >
                            <div
                                className="bg-background-a10 text-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                                >
                                ✖
                                </button>
                                <CreateNote
                                onNoteAdded={() => {
                                    fetchNotes();
                                    setIsModalOpen(false);
                                }}
                                />
                            </div>
                        </div>
                    )}
                    {loadingNotes ? (
                        <p className="text-white text-center">Loading notes...</p>
                    ) : error ? (
                        <p className="text-red-500 text-center">{error}</p>                    ) : Array.isArray(notes) && notes.length === 0 ?
                    (
                        <p className="text-white">No content rightnow. Start writing!</p>
                    ) :
                    (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <Note key={note._id} note={note} onDelete={handleDeleteNote}/>
                        ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}