const express = require("express");
const router = express.Router();
const { StudentModel, validateStudent } = require("../models/studentModel")

router.get("/", async (req, res) => {
    try {

        let s = req.query.s || "";
        s = new RegExp(s, "i");

        // const limit = req.query.limit || 5;
        // const page = req.query.page - 1 || 0
        // const sort = req.query.sort || "_id"
        // const reverse = req.query.reverse == "yes" ? 1 : -1;

        const students = await StudentModel
            .find({ name: s })
            .limit(limit)
            .skip(limit * page)
            .sort({ [sort]: reverse })
        res.json(students)
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }

})

router.post("/", async (req, res) => {
    const validBody = validateStudent(req.body);
    if (validBody.error) {
        return res.status(401).json(validBody.error.details);
    }

    try {
        const student = new StudentModel(req.body);
        student.save()
        res.status(201).json(student)
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.put("/:id", async (req, res) => {
    const validBody = validateStudent(req.body);
    if (validBody.error) {
        return res.status(401).json(validBody.error.details);
    }

    try {
        const id = req.params.id
        const student = await StudentModel.updateOne({ _id: id }, req.body)
        // modfiedCount:1 אם הצליח נקבל
        res.json(student);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const student = await StudentModel.deleteOne({ _id: req.params.id })
        res.json(student)
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

module.exports = router;