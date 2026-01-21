# Baza sekwencji promotorowych DNA

## Tech stack
* React
* Express
* MongoDB
* Mongoose

## Backend
API:
* GET /promotors - wyrzuca wyniki z bazy
	* ?page - paginacja
	* ?limit - limit wyników na stronę; defaultowo - 10
	* ?[filtr]=[tekst]
	* ?q=[tekst] - wyszukiwanie frazą
* GET /promotors/filters - pobiera opcje filtrowania
* POST /promotors - pozwala dodać rekord do bazy
	*	GC content oraz długość sekwencji jest liczona w backendzie, nie jest podawana w requeście
* POST /promotors/bulk - dodawanie w bulku

![img](https://raw.githubusercontent.com/wavetearz/baza-promotor/refs/heads/main/img/full.png)

![img](https://raw.githubusercontent.com/wavetearz/baza-promotor/refs/heads/main/img/filtered.png)
