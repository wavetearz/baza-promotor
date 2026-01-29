---
title: Uruchomienie aplikacji
sidebar_label: Uruchomienie aplikacji
sidebar_position: 1
---

# Uruchamianie aplikacji

Na projekt składają się trzy oddzielne aplikacje:

1. Backend - Express + MongoDB
2. Frontend - panel administracyjny (React)
3. Frontend - strona główna (React)


---

Przed uruchomieniem aplikacji, upewnij się, ze w MongoDB jest utworzona baza `promotory`

## 1. Backend - Express + MongoDB

Backend jest oparty na **Express** i korzysta z bazy **MongoDB**.  

### Krok 1: Instalacja zależności
Przejdź do katalogu backendu i zainstaluj zależności:

```bash
cd backend
npm install
````

### Krok 2: Konfiguracja połączenia z MongoDB

Połączenie z bazą danych MongoDB znajduje się w pliku `server.js`:

```javascript
mongoose.connect(`mongodb://127.0.0.1:27017/promotory`, {})
  .then(() => console.log("connected"))
```

Upewnij się, że MongoDB działa lokalnie na porcie `27017`.
Backend działa defaultowo na porcie 4000.

### Krok 3: Uruchomienie backendu

```bash
npm start
```

---

## 2. Frontend - Panel administracyjny

Panel administracyjny jest aplikacją **React**.

### Krok 1: Instalacja zależności

Przejdź do katalogu panelu admina i zainstaluj zależności:

```bash
cd admin-panel
npm install
```

### Krok 2: Konfiguracja portu

Utwórz plik `.env` w katalogu aplikacji i dodaj port, np.:

```
PORT=3001
```

### Krok 3: Uruchomienie aplikacji

```bash
npm start
```

Panel administracyjny powinien być dostępny pod adresem `http://localhost:3001`.

---

## 3. Frontend - Strona główna

Strona główna również jest aplikacją **React**.

### Krok 1: Instalacja zależności

Przejdź do katalogu strony głównej i zainstaluj zależności:

```bash
cd frontend
npm install
```

### Krok 2: Konfiguracja portu

Utwórz plik `.env` w katalogu aplikacji i dodaj port, np.:

```
PORT=3000
```

### Krok 3: Uruchomienie aplikacji

```bash
npm start
```

Strona główna powinna być dostępna pod adresem `http://localhost:3000`.
