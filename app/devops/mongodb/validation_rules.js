export const userValidationRule = {
  validator: {
    $jsonSchema: {
      required: [
        'first_name',
        'display_name',
        'email'
      ]
    }
  },
  validationAction: 'error',
  validationLevel: 'strict'
};
export const productValidationRule = {
  validator: {
    $jsonSchema: {
      required: [
        'name',
        'price',
        'color'
      ]
    }
  },
  validationAction: 'error',
  validationLevel: 'strict'
};
