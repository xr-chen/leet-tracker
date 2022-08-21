const Progress = require("../model/progress");
const { check, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();

router.post("/write", (req, res) => {
    const data = req.body;
    let record = new Progress(data);
    record.save()
        .then(r => res.send(r));
})

module.exports = router;