import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import MainTable from "./components/MainTable";
import Pagination from "./components/Pagination";

/*	TODO:
- sortowanie po kolumnach
- naprawa bledu z numerowaniem przy paginacji po zastosowaniu filtra
- wyszukiwanie po wartosciach tekstowych
- single-page view po kliknieciu na wiersz tabeli
- eksport do CSV
- wiecej danych (wiarygodnych z ncbi)
*/

function App() {
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
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

	return (
		<div className="App">
			<Navbar />
			<main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
				<SearchBar />
				<Filters filters={filters} setFilters={setFilters} onClear={clearFilters} />
				<MainTable page={page} setTotalPages={setTotalPages} filters={filters} />
				<Pagination page={page} setPage={setPage} totalPages={totalPages} />
			</main>
		</div>
	);
}

export default App;