import { Category } from "../model/category.model.js";

async function findOneCategory(id) {
  const category = await Category.findOne({
    where: { id },
    include: [
      {
        model: Category,
        as: "children",
      },
    ],
  });
  if (!category) throw new Error("Category not found!");
  return category;
}

export const addNewCategory = async (req, reply) => {
  const { name, parentId } = req.body;
  if (parentId) {
    const parentCategory = await Category.findOne({
      where: { id: parentId },
    });
    if (!parentCategory) {
      return reply.code(400).send({ message: "Parent category not found!" });
    }
  }
  const existingCategory = await Category.findOne({
    where: { name },
  });
  if (existingCategory) {
    return reply.code(400).send({ message: "Category already exists!" });
  }
  const newCategory = await Category.create({ name, parentId });
  return reply.code(201).send({
    statusCode: 201,
    message: "Category created successfully",
    category: newCategory,
  });
};

export const updateCategory = async (req, reply) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await findOneCategory(id);
  category.setDataValue("name", name);
  await category.save();
  return reply.code(200).send({
    statusCode: 200,
    message: "category updated successfully",
  });
};

export const getAllCategories = async (req, reply) => {
  const categories = await Category.findAll({
    // How many nested layers we want to have , we should have the same includes(count)
    include: [
      {
        model: Category,
        as: "children",
        include: [{ model: Category, as: "children" }],
      },
    ],
    where: {
      parentId: null,
    },
  });
  return reply.code(200).send({
    statusCode: 200,
    categories,
  });
};

export const getOneCategory = async (req, reply) => {
  const { id } = req.params;
  const category = await findOneCategory(id);
  return reply.code(200).send({
    statusCode: 200,
    category,
  });
};

export const removeCategory = async (req, reply) => {
  const { id } = req.params;
  const category = await findOneCategory(id);
  await category.destroy();
  return reply.code(200).send({
    statusCode: 200,
    message: "Category deleted successfully",
  });
};
