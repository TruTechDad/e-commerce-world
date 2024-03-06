const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
    try {
      const tagsForProducts = await Tag.findAll({
        include: [{ model: Product, through: ProductTag }], 
      });
      res.status(200).json(tagsForProducts);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagsForProducts = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }], 
    });
    if (!tagsForProducts) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.status(200).json(tagsForProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagUpdate = await Tag.findByPk(req.params.id);
    if (!tagUpdate) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    await tagUpdate.update(req.body);
    res.status(200).json(tagUpdate);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDelete = await Tag.findByPk(req.params.id);
    if (!tagDelete) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    await tagDelete.update(req.body);
    res.status(200).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
