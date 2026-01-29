---
title: Backend
sidebar_label: Backend
sidebar_position: 1
---

## Backend (API)

Backend jest zbudowany w Node.js z użyciem Express, Mongoose i MongoDB.

### Schemat danych Promotora

| Pole                  | Typ                  | Opis |
|-----------------------|--------------------|------|
| sequence              | String             | Sekwencja DNA promotora |
| geneName              | String             | Nazwa genu |
| organismName          | String             | Nazwa organizmu |
| organismType          | String (enum)      | Typ organizmu: `Eukaryota` lub `Prokaryota` |
| sequenceLength        | Number             | Długość sekwencji (obliczana automatycznie) |
| gcContent             | Number             | Zawartość GC w sekwencji w % (obliczana automatycznie) |
| geneFunction          | String             | Funkcja genu |
| ncbiAccession         | String             | Identyfikator NCBI |
| chromosome            | String             | Chromosom |
| dataType              | String (enum)      | Typ danych: `Experimental` lub `Predicted` |
| publicationAuthors    | [String]           | Lista autorów publikacji |
| geneLocation          | Object             | Obliczana automatycznie na podstawie dlugosci promotora i miejscu startu |
| createdAt / updatedAt | Date               | Timestampy (automatycznie) |

---

### Endpointy API

#### Pobranie filtrów

**GET** `/promotors` - wyrzuca wyniki z bazy
  * `?page` - paginacja
  * `?limit` - limit wyników na stronę; defaultowo - 10
  * `?[filtr]=[tekst]` - przykładowo: dataType, organismType, geneFunction
  * `?q=[tekst]` - wyszukiwanie frazą

**GET** `/promotors/filters` - pobiera opcje filtrowania

**POST** `/promotors` - pozwala dodać rekord do bazy
Przykładowe body:
```json
{
  "sequence": "ATGCGTACGTTAGC",
  "geneName": "lacZ",
  "organismName": "Escherichia coli",
  "organismType": "Prokaryota",
  "geneFunction": "Beta-galaktozydaza",
  "ncbiAccession": "NC_000913.3",
  "chromosome": "1",
  "dataType": "Experimental",
  "publicationAuthors": ["Author1"],
  "geneLocation": "1"
}
```


**POST** `/promotors/bulk` - dodawanie w bulku
Przykładowe body:
```json
[
  {
    "sequence": "ATGCGTACGTTAGC",
    "geneName": "lacZ",
    "organismName": "Escherichia coli",
    "organismType": "Prokaryota",
    "geneFunction": "Beta-galaktozydaza",
    "ncbiAccession": "NC_000913.3",
    "chromosome": "1",
    "dataType": "Experimental",
    "publicationAuthors": ["Author1"],
    "geneLocation": "1"
  },
  {
    "sequence": "ATTTTTT",
    "geneName": "lacI",
    "organismName": "Escherichia coli",
    "organismType": "Prokaryota",
    "geneFunction": "Beta-galaktozydaza",
    "ncbiAccession": "NC_000913.3",
    "chromosome": "1",
    "dataType": "Experimental",
    "publicationAuthors": ["Author1"],
    "geneLocation": "1"
  }
]