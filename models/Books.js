const mongoose = require("mongoose");
const Joi = require("joi");
const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 200,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Author",
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 200,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      minLength: 0,
      maxLength: 200,
    },
    cover: {
      type: String,
      required: true,
      enum: ["soft cover", "hard cover"],
    },
  },
  { timestamps: true }
);
function validateCreateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(1).max(200).required(),
    author: Joi.string().trim().min(1).max(200).required(),
    description: Joi.string().trim().min(1).max(200).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().valid("soft cover", "hard cover").required(),
  });
  return schema.validate(obj);
}

function validateUpdateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(1).max(200),
    author: Joi.string().trim().min(1).max(200),
    description: Joi.string().trim().min(1).max(200),
    price: Joi.number().min(0),
    cover: Joi.string().valid("soft cover", "hard cover"),
  });
  return schema.validate(obj);
}
const Book = mongoose.model("Book", BookSchema);

module.exports = {
  Book,
  validateCreateBook,
  validateUpdateBook,
};
