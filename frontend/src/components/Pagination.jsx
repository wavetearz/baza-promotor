export default function Pagination({ page, setPage, totalPages }) {
	return (
		<div className="flex justify-between items-center mt-4">
			<button className="px-3 py-1 border rounded disabled:opacity-50" disabled={page === 1}
				onClick={() => setPage((p) => Math.max(p - 1, 1))}>
				Poprzednia
			</button>

			<span className="text-sm">Strona {page} / {totalPages}</span>

			<button className="px-3 py-1 border rounded disabled:opacity-50" disabled={page === totalPages}
				onClick={() => setPage((p) => Math.min(p + 1, totalPages))}>
				Następna
			</button>
		</div>
	);
}
// todo uniemozliwienie przejscia do nastepnej strony w backendzie