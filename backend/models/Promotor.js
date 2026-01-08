const mongoose = require("mongoose");

const GeneLocationSchema = new mongoose.Schema({
    start: { type: String, default: "" },
    end: { type: String, default: "" }
}, { _id: false });

const PromotorSchema = new mongoose.Schema({
    sequence: { type: String, default: "" },
    geneName: { type: String, default: "" },
    organismName: { type: String, default: "" },
    organismType: {                                     
        type: String,
        enum: ["Eukaryota", "Prokaryota"],
        default: "Prokaryota",
    },
    sequenceLength: { type: Number, default: 0 },
    gcContent: { type: Number, default: 0.0 },
    geneFunction: { type: String, default: "" },
    ncbiAccession: { type: String, default: "" },
    chromosome: { type: String, default: "" },
    dataType: {                                     
        type: String,
        enum: ["Experimental", "Predicted"],
        default: "Experimental",
    },
    publicationAuthors: { type: [String], default: [] },
    geneLocation: { type: GeneLocationSchema, default: { start: "", end: "" } },
}, {timestamps: true});

module.exports = mongoose.model("Promotor", PromotorSchema, "promotors");
