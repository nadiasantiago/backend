export const generateProductErrorInfo = (product) => {
    return ['One or more properties were incomplete or not valid.',
      'List of required properties: \n',
      `* title: needs to be a string, received ${product.title} \n`,
      `* description: needs to be a string, received ${product.description} \n`,
      `* price: needs to be a number, received ${product.price} \n`,
      `* code: needs to be a string, received ${product.code} \n`,
      `* stock: needs to be a number, received ${product.stock} \n`,
      `* category: needs to be a string, received ${product.category} \n`];
};