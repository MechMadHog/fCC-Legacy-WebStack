const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    test("should correctly read a whole number input", function () {
    assert.equal(convertHandler.getNum("32L"), 32);
  });

  test("should correctly read a decimal number input", function () {
    assert.equal(convertHandler.getNum("3.1mi"), 3.1);
  });

  test("should correctly read a fractional input", function () {
    assert.equal(convertHandler.getNum("1/2km"), 0.5);
  });

  test("should correctly read a fractional input with a decimal", function () {
    assert.equal(convertHandler.getNum("2.5/5kg"), 0.5);
  });

  test("should return error on double fraction", function () {
    assert.equal(convertHandler.getNum("3/2/3kg"), "invalid number");
  });

  test("should default to 1 when no number is provided", function () {
    assert.equal(convertHandler.getNum("kg"), 1);
  });

  test("should correctly read each valid input unit", function () {
    assert.equal(convertHandler.getUnit("gal"), "gal");
    assert.equal(convertHandler.getUnit("L"), "L");
    assert.equal(convertHandler.getUnit("mi"), "mi");
    assert.equal(convertHandler.getUnit("km"), "km");
    assert.equal(convertHandler.getUnit("lbs"), "lbs");
    assert.equal(convertHandler.getUnit("kg"), "kg");
  });

  test("should return error for invalid input unit", function () {
    assert.equal(convertHandler.getUnit("32g"), "invalid unit");
  });

  test("should return correct return unit for each valid unit", function () {
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
    assert.equal(convertHandler.getReturnUnit("L"), "gal");
    assert.equal(convertHandler.getReturnUnit("mi"), "km");
    assert.equal(convertHandler.getReturnUnit("km"), "mi");
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
  });

  test("should return spelled-out unit string", function () {
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
    assert.equal(convertHandler.spellOutUnit("L"), "liters");
    assert.equal(convertHandler.spellOutUnit("mi"), "miles");
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
  });

  test("should correctly convert gal to L", function () {
    assert.approximately(convertHandler.convert(1, "gal"), 3.78541, 0.00001);
  });

  test("should correctly convert L to gal", function () {
    assert.approximately(convertHandler.convert(1, "L"), 0.26417, 0.00001);
  });

  test("should correctly convert mi to km", function () {
    assert.approximately(convertHandler.convert(1, "mi"), 1.60934, 0.00001);
  });

  test("should correctly convert km to mi", function () {
    assert.approximately(convertHandler.convert(1, "km"), 0.62137, 0.00001);
  });

  test("should correctly convert lbs to kg", function () {
    assert.approximately(convertHandler.convert(1, "lbs"), 0.453592, 0.00001);
  });

  test("should correctly convert kg to lbs", function () {
    assert.approximately(convertHandler.convert(1, "kg"), 2.20462, 0.00001);
  });

});