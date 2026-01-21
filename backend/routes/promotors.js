const express = require("express"); 
const router = express.Router(); // tworzymy router express
const Promotor = require("../models/Promotor"); // importujemy model Promotor z pliku models/Promotor.js
// https://www.reddit.com/r/learnprogramming/comments/984p2l/nodejs_expressrouter_how_to_use_itwhat_it_does/?tl=pl

const calcGC = (seq) => {
    const gcCount = (seq.match(/[GC]/gi) || []).length; // liczymy wystapienia G i C w sekwencji, uzywamy do tego regexu
    return parseFloat(((gcCount / seq.length) * 100).toFixed(2)); // obliczamy procentowa zawartosc GC i zaokraglamy do 2 miejsc po przecinku
};
// funkcja do obliczania zawartosci GC w sekwencji

router.get("/filters", async (req, res) => { // endpoint do pobierania unikalnych wartosci dla filtrów
    const geneFunctions = await Promotor.distinct("geneFunction"); // pobieramy wszystkie unikalne wartosci pola geneFunction z kolekcji Promotor
    const organismTypes = await Promotor.distinct("organismType"); // pobieramy wszystkie unikalne wartosci pola organismType z kolekcji Promotor
    const dataTypes = await Promotor.distinct("dataType"); // pobieramy wszystkie unikalne wartosci pola dataType z kolekcji Promotor
    // robimy to po to, zeby we wlasciwej aplikacji frontendowej moc wyswietlic uzytkownikowi dostepne opcje do filtrowania wynikow
    res.json({
        geneFunctions,
        organismTypes,
        dataTypes
    }); // odesylamy te unikalne wartosci jako odpowiedz w formacie JSON
});

router.get("/", async (req, res) => { // glowny endpoint do pobierania danych o promotorach z bazy danych
    try {
        const page = parseInt(req.query.page) || 1; // pobieramy numer strony z zapytania (domyslnie 1)
        const limit = parseInt(req.query.limit) || 10; // pobieramy limit wynikow na strone z zapytania (domyslnie 10)
        const skip = (page - 1) * limit; // obliczamy ile wynikow pominac na podstawie strony i limitu

        const filter = {}; // tworzymy pusty obiekt filtra, ktory bedziemy uzupelniac na podstawie zapytania, zeby filtrowac wyniki
        if (req.query.q) { // jezeli w zapytaniu jest parametr q (szukana fraza)
            const regex = new RegExp(req.query.q, "i"); // tworzymy regex na podstawie tej frazy, z flaga "i" (ignorujaca wielkosc liter)
            filter.$or = [ // ustawiamy warunek $or w filtrze, zeby szukac w kilku polach jednoczesnie
                { geneName: regex }, // szukamy w polu geneName
                { organismName: regex }, // szukamy w polu organismName
                { sequence: regex } // szukamy w polu sequence
            ];
        }

        if (req.query.geneFunction) filter.geneFunction = req.query.geneFunction; // jezeli w zapytaniu jest parametr geneFunction, dodajemy go do filtra
        if (req.query.organismType) filter.organismType = req.query.organismType; // jezeli w zapytaniu jest parametr organismType, dodajemy go do filtra
        if (req.query.dataType) filter.dataType = req.query.dataType; // jezeli w zapytaniu jest parametr dataType, dodajemy go do filtra

        const total = await Promotor.countDocuments(filter); // liczymy calkowita liczbe dokumentow spelniajacych warunki filtra
        const promotors = await Promotor.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }); 
        // pobieramy dokumenty z kolekcji Promotor na podstawie filtra (find), z paginacja (skip - skipowanie pierwszych X pozycji) 
        // i sortowaniem malejacym po dacie utworzenia

        res.json({ // odesylamy odpowiedz w formacie JSON z danymi o promotorach oraz informacjami o paginacji (! to wazne)
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: promotors
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
 


router.post("/", async (req, res) => { // endpoint do dodawania nowego promotora do bazy danych
    const { sequence, geneName, organismName, organismType, 
        gcContent, geneFunction, ncbiAccession, 
        chromosome, dataType, publicationAuthors, geneLocation } = req.body;
        // pobieramy dane z ciala zapytania (req.body)

    const promotor = await Promotor.create({ // tworzymy nowy dokument w kolekcji Promotor z pobranych danych
        sequence,
        geneName,
        organismName,
        organismType,
        sequenceLength: sequence.length, // obliczamy dlugosc sekwencji
        gcContent: calcGC(sequence), // obliczamy zawartosc GC za pomoca funkcji calcGC
        geneFunction,
        ncbiAccession,
        chromosome,
        dataType,
        publicationAuthors,
        geneLocation: {start: geneLocation, end: (parseInt(geneLocation) + sequence.length).toString()} // obliczamy koniec genu na podstawie poczatku i dlugosci sekwencji
    });

    res.json(promotor); // odesylamy utworzony dokument jako odpowiedz w formacie JSON
});



router.post("/bulk", async (req, res) => { // endpoint do dodawania wielu promotorow naraz (bulk insert)
    let data = req.body;
    if (!Array.isArray(data)) { data = [data]; } // jezeli dane nie sa tablica (istnieje jeden rekord do dodania), zamieniamy je na tablice z jednym elementem
    const preparedData = data.map((item) => ({ // przygotowujemy dane do wstawienia do bazy danych
        sequence: item.sequence,
        geneName: item.geneName,
        organismName: item.organismName,
        organismType: item.organismType,
        sequenceLength: item.sequence.length,
        gcContent: calcGC(item.sequence),
        geneFunction: item.geneFunction,
        ncbiAccession: item.ncbiAccession,
        chromosome: item.chromosome,
        dataType: item.dataType,
        publicationAuthors: item.publicationAuthors,
        geneLocation: {
            start: item.geneLocation,
            end: (parseInt(item.geneLocation) + item.sequence.length).toString()
        }
    }));

    const promotors = await Promotor.insertMany(preparedData); // wstawiamy wiele dokumentow naraz do kolekcji Promotor
    res.json(promotors); // odesylamy wstawione dokumenty jako odpowiedz w formacie JSON
});


module.exports = router;