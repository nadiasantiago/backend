export const generateProductErrorInfo = (product) => {
    return `One or more properties were incomplete or not valid.
      List of required properties:
      * title: needs to be a string, received ${product.title}
      * description: needs to be a string, received ${product.description}
      * price: needs to be a number, received ${product.price}
      * code: needs to be a string, received ${product.code}
      * stock: needs to be a number, received ${product.stock}
      * category: needs to be a string, received ${product.category}`;
};