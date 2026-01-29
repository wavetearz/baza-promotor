import React, { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    sequence: "",
    geneName: "",
    organismName: "",
    organismType: "",
    geneFunction: "",
    ncbiAccession: "",
    chromosome: "",
    dataType: "",
    publicationAuthors: "",
    geneLocation: ""
  });

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://api.promotory.xyz//promotors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      alert("Promotor dodany");
      setForm({
        sequence: "",
        geneName: "",
        organismName: "",
        organismType: "",
        geneFunction: "",
        ncbiAccession: "",
        chromosome: "",
        dataType: "",
        publicationAuthors: "",
        geneLocation: ""
      });
    } else {
      alert("Błąd dodawania");
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) return;
    const res = await fetch(`https://api.promotory.xyz/promotors?q=${encodeURIComponent(search)}`);
    const data = await res.json();
    setResults(data.data || []);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Potwierdź usunięcie promotora")) return;
    const res = await fetch(`https://api.promotory.xyz/promotors/${id}`, { method: "DELETE" });
    if (res.ok) {
      setResults(results.filter(r => r._id !== id));
    } else {
      alert("Błąd usuwania");
    }
  };

  const handleEdit = async (id) => {
    const payload = {};
    for (let key in form) {
      if (form[key].trim() !== "") { // bierzemy tylko to co sie zmienilo
        payload[key] = form[key];
      }
    }

    if (Object.keys(payload).length === 0) {
      alert("Wpisz dane do edycji");
      return;
    }

    const res = await fetch(`https://api.promotory.xyz/promotors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert("Promotor zaktualizowany");
      // id - id ktore edytujemy
      // p._id - id z listy wynikow
      setResults(results.map(p => (p._id === id ? { ...p, ...payload } : p)));
      setForm({
        sequence: "",
        geneName: "",
        organismName: "",
        organismType: "",
        geneFunction: "",
        ncbiAccession: "",
        chromosome: "",
        dataType: "",
        publicationAuthors: "",
        geneLocation: ""
      });
    } else {
      alert("Błąd aktualizacji");
    }
  };

  return (
    <div className="container">
      <h2>Dodaj / edytuj promotor</h2>

      <form onSubmit={handleSubmit} className="form">
        <input name="sequence" value={form.sequence} onChange={handleChange} placeholder="Sequence" />
        <input name="geneName" value={form.geneName} onChange={handleChange} placeholder="Gene name" />
        <input name="organismName" value={form.organismName} onChange={handleChange} placeholder="Organism name" />
        <select name="organismType" value={form.organismType} onChange={handleChange}>
          <option value="">Organism Type</option>
          <option value="Prokaryota">Prokaryota</option>
          <option value="Eukaryota">Eukaryota</option>
        </select>
        <input name="geneFunction" value={form.geneFunction} onChange={handleChange} placeholder="Gene function" />
        <input name="ncbiAccession" value={form.ncbiAccession} onChange={handleChange} placeholder="NCBI accession" />
        <input name="chromosome" value={form.chromosome} onChange={handleChange} placeholder="Chromosome" />
        <select name="dataType" value={form.dataType} onChange={handleChange}>
          <option value="">Data type</option>
          <option value="Experimental">Experimental</option>
          <option value="Predicted">Predicted</option>
        </select>
        <input name="publicationAuthors" value={form.publicationAuthors} onChange={handleChange} placeholder="Authors" />
        <input name="geneLocation" type="number" value={form.geneLocation} onChange={handleChange} placeholder="Gene location" />
        <button type="submit" className="primary-btn">Dodaj promotor</button>
      </form>

      <hr />

      <h3>Usuń / Edytuj promotor</h3>
      <input value={search} onChange={(e) => setSearch(e.target.value)} className="search-input" placeholder="Szukaj promotora..." />
      <button onClick={handleSearch} className="primary-btn">Szukaj</button>

      {results.map(p => (
        <div key={p._id} className="result-card">
          <b>{p.geneName}</b> – {p.organismName}<br />
          <span className="sequence-preview">{p.sequence.slice(0, 40)}...</span><br />
          <div className="actions">
            <button className="edit-btn" onClick={() => handleEdit(p._id)}>Edytuj</button>
            <button className="delete-btn" onClick={() => handleDelete(p._id)}>Usuń</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;