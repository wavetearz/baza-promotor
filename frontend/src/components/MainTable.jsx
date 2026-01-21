import { useState, useEffect } from "react";

export default function MainTable({ page, setTotalPages, setPage, search, filters, limit = 10 }) {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const params = new URLSearchParams({
					page,
					limit,
					...(filters.geneFunction && { geneFunction: filters.geneFunction }),
					...(filters.organismType && { organismType: filters.organismType }),
					...(filters.dataType && { dataType: filters.dataType }),
					...(search && { q: search })
				});

				const response = await fetch(`http://localhost:4000/promotors?${params.toString()}`);
				const json = await response.json();
				if(filters.geneFunction || filters.organismType || filters.dataType) {
					setPage(1);
				}
				setData(json.data);
				setTotalPages(json.totalPages);
			} catch (error) {
				console.error(error);
			}
		};
	fetchData();
	}, [page, limit, filters, search, setTotalPages]);

  return (
    <div className="overflow-x-auto max-h-[370px] overflow-y-auto relative">
		<table className="min-w-[1200px] text-sm">
			<thead className="bg-gray-100 sticky top-0">
				<tr>
					<th className="px-3 py-2 text-left min-w-[200px]">Sekwencja</th>
					<th className="px-3 py-2 text-left min-w-[150px]">Nazwa genu</th>
					<th className="px-3 py-2 text-left min-w-[150px]">Nazwa organizmu</th>
					<th className="px-3 py-2 text-left min-w-[130px]">Typ organizmu</th>
					<th className="px-3 py-2 text-left min-w-[130px]">Długość sekwencji</th>
					<th className="px-3 py-2 text-left min-w-[100px]">GC Content</th>
					<th className="px-3 py-2 text-left min-w-[200px]">Funkcja</th>
					<th className="px-3 py-2 text-left min-w-[150px]">NCBI Accession</th>
					<th className="px-3 py-2 text-left min-w-[120px]">Chromosom</th>
					<th className="px-3 py-2 text-left min-w-[130px]">Typ danych</th>
					<th className="px-3 py-2 text-left min-w-[200px]">Autorzy</th>
					<th className="px-3 py-2 text-left min-w-[180px]">Lokalizacja genu</th>
				</tr>
			</thead>

			<tbody>
				{data.map((item, index) => (
					<tr key={item._id || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
						<td className="px-3 py-2 font-mono">{item.sequence}</td>
						<td className="px-3 py-2">{item.geneName}</td>
						<td className="px-3 py-2">{item.organismName}</td>
						<td className="px-3 py-2">{item.organismType}</td>
						<td className="px-3 py-2">{item.sequenceLength}</td>
						<td className="px-3 py-2">{item.gcContent}%</td>
						<td className="px-3 py-2">{item.geneFunction}</td>
						<td className="px-3 py-2">
						<a href={`https://www.ncbi.nlm.nih.gov/nuccore/${item.ncbiAccession}`} className="text-blue-600 hover:underline">
							{item.ncbiAccession}
						</a>
						</td>
						<td className="px-3 py-2">{item.chromosome}</td>
						<td className="px-3 py-2">{item.dataType}</td>
						<td className="px-3 py-2">{item.publicationAuthors?.join(", ")}</td>
						<td className="px-3 py-2">{item.geneLocation?.start}-{item.geneLocation?.end}</td>
					</tr>
				))}
			</tbody>
		</table>
    </div>
  );
}