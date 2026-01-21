export default function SearchBar({ value, onChange, isSearching }) {
  return (
    <div className="bg-white p-4 border rounded">
		<input type="text" placeholder="Wyszukaj wpisując nazwę genu, organizmu lub sekwencję..." 
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
		/>
		{isSearching && (
			<p className="text-xs text-gray-500 mt-1">Szukanie…</p>
		)}
    </div>
  );
}
