const router = require("express").Router();
const fs = require("fs");
const { nanoid } = require("nanoid");


router.get("/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

router.post("/notes", (req, res) => {

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        
        const savedNotes = JSON.parse(data);
        
        savedNotes.push({
            title: req.body.title,
            text: req.body.text,
            id: nanoid(),
        });

        fs.writeFile("./db/db.json", JSON.stringify(savedNotes), (err) => {
            if (err) return res.JSON({ err: "problem adding" });
            res.json({msg: "Just Added" });
        });
    });
});

router.delete("/notes/:id", (req, res) => {

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const savedNotes = JSON.parse(data);
        const deleteNotes = req.params.id;
        const clearedNote = savedNotes.filter((element) => deleteNotes !== element.id);

        fs.writeFile("./db/db.json", JSON.stringify(clearedNote), (err) => {
            if (err) return res.JSON({ err: "problem deleting" });
            res.json({msg: "Just Delated" });
        });
    });
});

module.exports = router;