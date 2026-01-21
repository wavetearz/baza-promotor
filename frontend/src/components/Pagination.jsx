export default function Pagination({ page, setPage, totalPages }) {
  const isEmpty = totalPages === 0;
  const safePage = isEmpty ? 0 : page;

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        disabled={isEmpty || page === 1}
        onClick={() => setPage(p => Math.max(p - 1, 1))}
      >
        Poprzednia
      </button>

      <span className="text-sm">
        Strona {safePage} / {totalPages}
      </span>

      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        disabled={isEmpty || page === totalPages}
        onClick={() => setPage(p => Math.min(p + 1, totalPages))}
      >
        Następna
    	</button>
	</div>
  );
}
