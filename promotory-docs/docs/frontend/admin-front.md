---
title: Panel administratora
sidebar_label: Panel administratora
sidebar_position: 2
---

## Panel administratora

Panel administracyjny pozwala na dodawanie, edytowanie i usuwanie promotorów w bazie danych.

### Dodaj / Edytuj promotor

Formularz umożliwia wprowadzenie następujących danych:

- **Sekwencja** – sekwencja DNA promotora
- **Nazwa genu**
- **Nazwa organizmu**
- **Typ organizmu** – wybór z listy (enum: Prokaryota, Eukaryota)
- **Funkcja genu**
- **NCBI ID** – identyfikator w bazie NCBI
- **Chromosom** - lokalizacja genu
- **Typ pozyskanych danych** – wybór z listy (enum: Experimental, Predicted)
- **Autorzy**

Po wypełnieniu formularza kliknięcie **Dodaj promotor** zapisuje nowy rekord w bazie MongoDB.

### Usuń / Edytuj promotor

- Pole wyszukiwania pozwala znaleźć promotor po nazwie.
- Wyniki wyświetlane są w formie listy z przyciskami **Edytuj** i **Usuń**.
  - **Edytuj** – umożliwia modyfikację istniejącej sekwencji/promotora.
  - **Usuń** – usuwa promotor z bazy danych.

Aby edytować promotor, wpisujemy wcześniej dane do zamiany (payload), a następnie wyszukujemy interesujący nas rekord i klikamy "Edytuj"