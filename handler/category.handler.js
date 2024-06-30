import { Category } from "../model/category.model.js";

export const addNewCategory = async (req, reply) => {
  const { name } = req.body;
  const category = await Category.findOne({
    where: { name },
  });
  if (category) reply.code(400).send({ message: "Category already exists!" });
  const newCategory = await Category.create({ name });
  await newCategory.save();
  return reply.code(201).send({
    statusCode: 201,
    message: "category created successfully",
  });
};

export const updateCategory = async (req, reply) => {};

export const getAllCategories = async (req, reply) => {
  const categories = await Category.findAll({});
  return reply.code(200).send({
    statusCode: 200,
    categories,
  });
};

export const getOneCategory = async (req, reply) => {
  const { id } = req.param;
  const category = await Category.findOne({
    where: { id },
  });
  if (!category) reply.code(404).send({ message: "Category not found!" });
  return reply.code(200).send({
    statusCode: 200,
    category,
  });
};

export const removeCategory = async (req, reply) => {};
