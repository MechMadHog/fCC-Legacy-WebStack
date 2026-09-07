'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      const input = req.query.input || '';
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);

      const invalidNum = initNum === 'invalid number';
      const invalidUnit = initUnit === 'invalid unit';

      if (invalidNum && invalidUnit) return res.send('invalid number and unit');
      if (invalidNum) return res.send('invalid number');
      if (invalidUnit) return res.send('invalid unit');

      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      return res.json({ initNum, initUnit, returnNum, returnUnit, string });
    });
};
