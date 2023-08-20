const mongoose = require("mongoose")
const Joi = require("joi")

const studentSchema = new mongoose.Schema({
    name: String,
    subject: String,
    score: Number,
    date_created: {
        type: Date, default: Date.now
    }
})

exports.StudentModel = mongoose.model("students", studentSchema);

exports.validateStudent = (body) => {
    const joiSchema = Joi.object({
        name: Joi.string().min(2).max(20).required(),
        subject: Joi.string().min(0).max(50).required(),
        score: Joi.number().min(0).max(100).required()
    })
    return joiSchema.validate(body)
}