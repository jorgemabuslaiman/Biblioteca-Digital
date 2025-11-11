
function BookCard({ title, author, img, onRead }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-4 flex flex-col items-center group w-full max-w-xs min-h-[340px]">
      <div className="w-full flex justify-center mb-3">
        <img src={img} alt={`Portada del libro ${title}`} className="w-36 h-52 object-cover rounded-lg shadow group-hover:scale-105 transition-transform" />
      </div>
      <h3 className="font-bold text-lg text-blue-800 mb-1 text-center line-clamp-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-2 text-center italic">{author}</p>
      <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition mt-auto" onClick={onRead} aria-label={`Leer el libro ${title}`}>Leer</button>
    </div>
  );
}

export default BookCard;
