import { useEffect, useState } from "react";

export default function Filters({ filters, setFilters, onClear }) {
    const [options, setOptions] = useState({
        geneFunctions: [],
        organismTypes: [],
        dataTypes: []
    });

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const res = await fetch("http://127.0.0.1:4000/promotors/filters");
                const json = await res.json();
                setOptions(json);
            } catch (err) {
                console.error(err);
            }
        };
        fetchFilters();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[3fr_3fr_3fr_1fr] gap-4">
            <select className="border px-3 py-2 rounded w-full" value={filters.organismType || ""} 
                onChange={(e) => setFilters(f => ({ ...f, organismType: e.target.value }))}>
                <option value="">Wszystkie typy organizmów</option>
                {options.organismTypes.map((type, i) => (
                    <option key={i} value={type}>{type}</option>
                ))}
            </select>

            <select className="border px-3 py-2 rounded w-full" value={filters.geneFunction || ""}
                onChange={(e) => setFilters(f => ({ ...f, geneFunction: e.target.value }))}>
                <option value="">Funkcja genu</option>
                {options.geneFunctions.map((func, i) => (
                    <option key={i} value={func}>{func}</option>
                ))}
            </select>

            <select className="border px-3 py-2 rounded w-full" value={filters.dataType || ""}
                onChange={(e) => setFilters(f => ({ ...f, dataType: e.target.value }))}>
                <option value="">Wszystkie typy danych</option>
                {options.dataTypes.map((type, i) => (
                    <option key={i} value={type}>{type}</option>
                ))}
            </select>

            <button className="border px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 md:w-36 w-full" onClick={onClear}>
                Wyczyść filtry
            </button>
        </div>
    );
}
