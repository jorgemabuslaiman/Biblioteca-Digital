
function CategoryCard({ name, img }) {
  return (
    <div className="bg-blue-100 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col items-center p-4 focus-within:ring-2 focus-within:ring-blue-400">
      <img src={img} alt={`Icono de categoría ${name}`} className="w-16 h-16 object-contain mb-2 transition-transform hover:scale-110" />
      <span className="font-semibold text-blue-800 text-center">{name}</span>
    </div>
  );
}

export default CategoryCard;
