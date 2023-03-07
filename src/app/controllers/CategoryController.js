const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoriesRepository.findall(orderBy);

    response.json(categories);
  }

  async show(request, response) {
    // Obter UM registro
    const { id } = request.params;

    const contact = await CategoriesRepository.findById(id);

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'User Not Found' });
    }

    response.json(contact);
  }

  // error handler (Middle Express)-> Manipulador de erros

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create({ name });

    response.json(category);
  }

  async update(request, response) {
    // Editar um registro
    const { id } = request.params;
    const { name } = request.body;

    const categoryExist = await CategoriesRepository.findById(id);
    if (!categoryExist) {
      return response.status(404).json({ error: 'User Not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const categories = await CategoriesRepository.update(id, {
      name,
    });

    response.json(categories);
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;

    await CategoriesRepository.delete(id);
    // 204: No content
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
