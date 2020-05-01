import Product from '../models/productSchema';

const DEFAULT_IMAGE = '/../img/cantfind.jpg';

class ProductStoreRepository {
  constructor() { }

  async store(product) {
    const length = await Product.collection.countDocuments();
    return await Product.create({
      ...product,
      id: length + 1,
      img: DEFAULT_IMAGE,
    })
  }

  async findById(id) {
    return await Product.find({
      id: id,
    });
  }

  async findByKeyword(keyword) {
    return await Product.find({
      title: new RegExp('^' + keyword + '$', "i")
    });
  }

  async findAll() {
    return await Product.find({});
  };

}

export default ProductStoreRepository;
