import React, { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    sequence: "",
    geneName: "",
    organismName: "",
    organismType: "Prokaryota",
    geneFunction: "",
    ncbiAccession: "",
    chromosome: "",
    dataType: "Experimental",
    publicationAuthors: "",
    geneLocation: ""
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      sequenceLength: Number(form.sequenceLength),
      gcContent: Number(form.gcContent),
      publicationAuthors: form.publicationAuthors
        .split(",")
        .map(a => a.trim())
    };

    try {
      const res = await fetch("https://api.promotory.xyz/promotors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setMsg("✅ Promotor dodany");
        setForm({
          sequence: "",
          geneName: "",
          organismName: "",
          organismType: "Prokaryota",
          sequenceLength: "",
          gcContent: "",
          geneFunction: "",
          ncbiAccession: "",
          chromosome: "",
          dataType: "Experimental",
          publicationAuthors: "",
          geneLocation: ""
        });
      } else {
        setMsg("Błąd wysyłania");
      }
    } catch {
      setMsg("Brak połączenia z API");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>Dodaj promotor</h2>
      <form onSubmit={handleSubmit}>
        <input name="sequence" value={form.sequence} onChange={handleChange} placeholder="Sequence" required style={{ width: "100%", marginBottom: 10, padding: 8 }}/><br/>
        <input name="geneName" value={form.geneName} onChange={handleChange} placeholder="Gene name" required style={{ width: "100%", marginBottom: 10, padding: 8 }}/><br/>
        <input name="organismName" value={form.organismName} onChange={handleChange} placeholder="Organism name" required style={{ width: "100%", marginBottom: 10, padding: 8 }}/><br/>
        <select name="organismType" value={form.organismType} onChange={handleChange} required style={{ width: "100%", marginBottom: 10, padding: 8 }}>
          <option value="Prokaryota">Prokaryota</option>
          <option value="Eukaryota">Eukaryota</option>
        </select><br/>
        <input name="geneFunction" value={form.geneFunction} onChange={handleChange} placeholder="Gene function" style={{ width: "100%", marginBottom: 10, padding: 8 }}/><br/>
        <input name="ncbiAccession" value={form.ncbiAccession} onChange={handleChange} placeholder="NCBI accession" style={{ width: "100%", marginBottom: 10, padding: 8 }}/><br/>
        <input name="chromosome" value={form.chromosome} onChange={handleChange} placeholder="Chromosome" style={{ width: "100%", marginBottom: 10, padding: 8 }}/><br/>
        <select name="dataType" value={form.dataType} onChange={handleChange} required style={{ width: "100%", marginBottom: 10, padding: 8 }}>
          <option value="Experimental">Experimental</option>
          <option value="Predicted">Predicted</option>
        </select><br/>
        <input name="publicationAuthors" value={form.publicationAuthors} onChange={handleChange} placeholder="Authors (comma separated)" style={{ width: "100%", marginBottom: 10, padding: 8 }}/><br/>
        <input name="geneLocation" type="number" value={form.geneLocation} onChange={handleChange} placeholder="Gene location" style={{ width: "100%", marginBottom: 10, padding: 8 }}/><br/>
        <button type="submit">Wyślij</button><br/>
      </form>

      <p>{msg}</p>
    </div>
  );
}

export default App;
