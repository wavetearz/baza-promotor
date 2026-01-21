import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import MainTable from "./components/MainTable";
import Pagination from "./components/Pagination";

/*	TODO:
- sortowanie po kolumnach
- single-page view po kliknieciu na wiersz tabeli
- eksport do CSV
- wiecej danych (wiarygodnych z ncbi)
*/

function App() {
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [search, setSearch] = useState("");
	const [filters, setFilters] = useState({
		geneFunction: "",
		organismType: "",
		dataType: ""
	});

	const clearFilters = () => {
		setFilters({
			geneFunction: "",
			organismType: "",
			dataType: ""
		});
		setPage(1);
	};

	const [debouncedSearch, setDebouncedSearch] = useState(""); // debouncing
	const debounceTime = 0.7;

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(search);
			setPage(1);
		}, debounceTime * 1000);
		return () => clearTimeout(timer);
	}, [search]);

	return (
		<div className="App">
			<Navbar />
			<main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
				<SearchBar value={search} isSearching={search !== debouncedSearch} onChange={(v) => { setSearch(v); setPage(1); }} />
				<Filters filters={filters} setFilters={setFilters} onClear={clearFilters} />
				<MainTable page={page} setTotalPages={setTotalPages} setPage={setPage} filters={filters} search={debouncedSearch} />
				<Pagination page={page} setPage={setPage} totalPages={totalPages} />
			</main>
		</div>
	);
}

export default App;