// const _ = require('lodash');

export function read (req, res, next) {
  const response = {
    'address_line_1': 'Bangalore',
    'state': 'Karnataka'
  };

  res.status(200).json({
    'success': true,
    'data': response
  });
};
