const express = require("express"); 
const router = express.Router();
const Promotor = require("../models/Promotor");

const calcGC = (seq) => {
    const gcCount = (seq.match(/[GC]/gi) || []).length;
    return parseFloat(((gcCount / seq.length) * 100).toFixed(2));
};

router.get("/filters", async (req, res) => {
    const geneFunctions = await Promotor.distinct("geneFunction");
    const organismTypes = await Promotor.distinct("organismType");
    const dataTypes = await Promotor.distinct("dataType");
    res.json({
        geneFunctions,
        organismTypes,
        dataTypes
    });
});

router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.q) {
            const regex = new RegExp(req.query.q, "i");
            filter.$or = [
                { geneName: regex },
                { organismName: regex },
                { sequence: regex }
            ];
        }

        if (req.query.geneFunction) filter.geneFunction = req.query.geneFunction;
        if (req.query.organismType) filter.organismType = req.query.organismType;
        if (req.query.dataType) filter.dataType = req.query.dataType;

        const total = await Promotor.countDocuments(filter);
        const promotors = await Promotor.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });

        res.json({
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
 


router.post("/", async (req, res) => {
    const { sequence, geneName, organismName, organismType, gcContent, geneFunction, ncbiAccession, chromosome, dataType, publicationAuthors, geneLocation } = req.body;
    const gc = (c) => {
        const gcCount = (c.match(/[GC]/gi) || []).length;
        return ((gcCount / c.length) * 100).toFixed(2);
    }

    const promotor = await Promotor.create({ 
        sequence,
        geneName,
        organismName,
        organismType,
        sequenceLength: sequence.length, 
        gcContent: calcGC(sequence),
        geneFunction,
        ncbiAccession,
        chromosome,
        dataType,
        publicationAuthors,
        geneLocation: {start: geneLocation, end: (parseInt(geneLocation) + sequence.length).toString()}
    });
    res.json(promotor);
});



router.post("/bulk", async (req, res) => {
    let data = req.body;
    if (!Array.isArray(data)) { data = [data]; }
    const preparedData = data.map((item) => ({
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

    const promotors = await Promotor.insertMany(preparedData);
    res.json(promotors);
});


module.exports = router;