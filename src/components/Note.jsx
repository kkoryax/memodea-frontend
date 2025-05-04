const Note = ({ note }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <div>
        {note.isPinned && (
          <div className="flex items-center mb-2">
            <span className="text-background-a10 text-sm font-bold">📌 Pinned</span>
          </div>
        )}

        <h2 className="text-xl font-bold mb-2 text-gray-800">
          {note.title}
        </h2>

        <p className="text-gray-600 text-sm line-clamp-4">{note.content}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-background-a10 text-white text-xs font-medium px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
        <span>Created on: {new Date(note.createdOn).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default Note;
