"use strict";

const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.get("/api/convert", function (req, res) {
    const input = String(req.query.input || "");

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    const numInvalid = initNum === "invalid number";
    const unitInvalid = initUnit === "invalid unit";

    if (numInvalid && unitInvalid)
      return res.type("text").send("invalid number and unit");

    if (numInvalid)
      return res.type("text").send("invalid number");

    if (unitInvalid)
      return res.type("text").send("invalid unit");

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum =
      Math.round(
        convertHandler.convert(initNum, initUnit) * 100000
      ) / 100000;

    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    return res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    });
  });
};
