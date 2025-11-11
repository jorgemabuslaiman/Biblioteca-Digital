
function BookCard({ title, author, img, onRead }) {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-4 flex flex-col items-center group">
      <img src={img} alt={`Portada del libro ${title}`} className="w-28 h-40 object-cover rounded mb-3 group-hover:scale-105 transition-transform" />
      <h3 className="font-semibold text-lg text-blue-800 mb-1 text-center">{title}</h3>
      <p className="text-sm text-gray-600 mb-2 text-center">{author}</p>
      <button className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" onClick={onRead} aria-label={`Leer el libro ${title}`}>Leer</button>
    </div>
  );
}

export default BookCard;
