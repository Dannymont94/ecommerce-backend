const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [Category, Tag]
    });
    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findOne({
      where: {
        id: req.params.id
      },
      include: [Category, Tag]
    });
    if (!productData) {
      res.status(404).json({ message: `No product found with that id` });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      category_id: 1,
      tagIds: [1, 2, 3, 4] (optional)
    }
  */
  try {
    const { product_name, price, stock, category_id, tagIds } = req.body;
    if (!product_name || !price || !stock || !category_id) {
      res.status(404).json({ message: `Needs values for product_name, price, stock, category_id` });
      return;
    }
    const productData = await Product.create(
      {
        product_name,
        price,
        stock,
        category_id
      }
    );
    // if no product tags, just respond
    if (!tagIds.length) {
      res.status(200).json(productData);
      return;
    }
    // if there are product tags, we need to create pairings to bulk create in the ProductTag model
    const productTagIdArr = tagIds.map((tag_id) => {
      return {
        product_id: productData.id,
        tag_id
      };
    });
    const productTagIds = await ProductTag.bulkCreate(productTagIdArr);
    res.status(200).json(productTagIds);
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    // update product data
    const { product_name, price, stock, category_id, tagIds } = req.body;
    if (!product_name && !price && !stock && !category_id && !tagIds) {
      res.status(404).json({ message: `Please send at least one value to update from the following: product_name, price, stock, category_id, tagIds` });
      return;
    }
    const productData = await Product.update(
      {
        product_name,
        price,
        stock,
        category_id
      },
      {
        where: {
          id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: `No product found with that id` });
      return;
    }
    // if no product tags, just respond
    if (!tagIds.length) {
      res.status(200).json(productData);
      return;
    }
    // if there are tagIds, find all associated tags from ProductTag and store as array
    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
    // get array of current tag_ids
    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    // create filtered array of new product_ids by storing the tag_ids that were not in the array of current productTagIds
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id
        };
      });
    // figure out which ones to remove by storing the tag_ids that were not in the req.body.tag_id array
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);
    // run both actions
    const updatedProductTags = await Promise.all([
      ProductTag.destroy({
        where: {
          id: productTagsToRemove
        }
      }),
      ProductTag.bulkCreate(newProductTags),
    ]);
    res.status(200).json(updatedProductTags);
  } catch(err) {
      console.log(err);
      res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!productData) {
      res.status(404).json({ message: `No product found with that id` });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
