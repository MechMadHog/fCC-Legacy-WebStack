"use strict";

function ConvertHandler() {
  const units = {
    gal: { returnUnit: "L", spell: "gallons", factor: 3.78541 },
    l: { returnUnit: "gal", spell: "liters", factor: 1 / 3.78541 },
    mi: { returnUnit: "km", spell: "miles", factor: 1.60934 },
    km: { returnUnit: "mi", spell: "kilometers", factor: 1 / 1.60934 },
    lbs: { returnUnit: "kg", spell: "pounds", factor: 0.453592 },
    kg: { returnUnit: "lbs", spell: "kilograms", factor: 1 / 0.453592 },
  };

  const normalizeUnit = (u) => {
    if (!u) return null;
    if (/^l$/i.test(u)) return "L";
    return u.toLowerCase();
  };

  this.getNum = function (input) {
    const idx = input.search(/[a-zA-Z]/);
    const numStr = idx === -1 ? input : input.slice(0, idx);

    if (!numStr) return 1;

    const slashCount = (numStr.match(/\//g) || []).length;
    if (slashCount > 1) return "invalid number";

    if (slashCount === 1) {
      const [a, b] = numStr.split("/");
      const n1 = parseFloat(a);
      const n2 = parseFloat(b);
      if (!isFinite(n1) || !isFinite(n2)) return "invalid number";
      return n1 / n2;
    }

    const n = parseFloat(numStr);
    if (!isFinite(n)) return "invalid number";
    return n;
  };

  this.getUnit = function (input) {
    const idx = input.search(/[a-zA-Z]/);
    if (idx === -1) return "invalid unit";

    const raw = input.slice(idx);
    const unit = normalizeUnit(raw);

    if (unit === "L") return "L";
    if (units[unit]) return unit;

    return "invalid unit";
  };

  this.getReturnUnit = function (initUnit) {
    if (initUnit === "L") return "gal";
    return units[initUnit.toLowerCase()].returnUnit;
  };

  this.spellOutUnit = function (unit) {
    if (unit === "L") return "liters";
    return units[unit.toLowerCase()].spell;
  };

  this.convert = function (initNum, initUnit) {
    if (initUnit === "L") return initNum * units.l.factor;
    return initNum * units[initUnit.toLowerCase()].factor;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(
      returnUnit
    )}`;
  };
}

module.exports = ConvertHandler;
