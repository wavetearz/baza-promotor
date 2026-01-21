const mongoose = require("mongoose");

// string - typ pola tekstowego
// number - typ pola liczbowego
// enum - ograniczenie wartosci pola do okreslonego zbioru wartosci
// default - wartosc domyslna pola
// timestamps - automatyczne dodawanie pol createdAt i updatedAt do dokumentow

const GeneLocationSchema = new mongoose.Schema({ // podschemat do przechowywania informacji o lokalizacji genu
    start: { type: String, default: "" }, // poczatek genu
    end: { type: String, default: "" } // koniec genu
}, { _id: false }); // wylaczamy tworzenie osobnego id dla podschematu

const PromotorSchema = new mongoose.Schema({ // glowny schemat dokumentu Promotor
    sequence: { type: String, default: "" },
    geneName: { type: String, default: "" },
    organismName: { type: String, default: "" },
    organismType: {                                     
        type: String,
        enum: ["Eukaryota", "Prokaryota"], // ograniczamy typ organizmu do dwoch wartosci
        default: "Prokaryota", // wartosc domyslna to Prokaryota
    },
    sequenceLength: { type: Number, default: 0 },
    gcContent: { type: Number, default: 0.0 },
    geneFunction: { type: String, default: "" },
    ncbiAccession: { type: String, default: "" },
    chromosome: { type: String, default: "" },
    dataType: {                                     
        type: String,
        enum: ["Experimental", "Predicted"], // ograniczamy typ danych do dwoch wartosci
        default: "Experimental", // wartosc domyslna to Experimental
    },
    publicationAuthors: { type: [String], default: [] },
    geneLocation: { type: GeneLocationSchema, default: { start: "", end: "" } }, // uzywamy podschematu GeneLocationSchema
}, {timestamps: true});

module.exports = mongoose.model("Promotor", PromotorSchema, "promotors"); 
// eksportujemy model Mongoose o nazwie "Promotor", oparty na schemacie PromotorSchema
