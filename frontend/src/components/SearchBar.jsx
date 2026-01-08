export default function SearchBar() {
	return (
		<div className="bg-white p-4 border rounded">
			<input
				type="text"
				placeholder="Wyszukaj wpisując nazwę genu, organizmu lub sekwencję..."
				className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
			/>
		</div>
	)
}
