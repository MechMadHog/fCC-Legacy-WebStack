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
    const t = String(u).trim();
    if (/^l$/i.test(t)) return "L";
    return t.toLowerCase();
  };

  this.getNum = function (input) {
    const str = String(input || "");

    const idx = str.search(/[a-zA-Z]/);
    const numStr = idx === -1 ? str : str.slice(0, idx);

    if (!numStr) return 1;

    const slashCount = (numStr.match(/\//g) || []).length;
    if (slashCount > 1) return "invalid number";

    if (slashCount === 1) {
      const parts = numStr.split("/");
      const n1 = parseFloat(parts[0]);
      const n2 = parseFloat(parts[1]);
      if (!isFinite(n1) || !isFinite(n2)) return "invalid number";
      return n1 / n2;
    }

    const n = parseFloat(numStr);
    if (!isFinite(n)) return "invalid number";
    return n;
  };

  this.getUnit = function (input) {
    const str = String(input || "");

    const idx = str.search(/[a-zA-Z]/);
    if (idx === -1) return "invalid unit";

    const rawUnit = str.slice(idx);
    const unit = normalizeUnit(rawUnit);

    if (unit === "L") return "L";
    if (units[unit]) return unit;

    return "invalid unit";
  };

  this.getReturnUnit = function (initUnit) {
    if (initUnit === "L") return "gal";
    const key = String(initUnit || "").toLowerCase();
    if (!units[key]) return "invalid unit";
    return units[key].returnUnit;
  };

  this.spellOutUnit = function (unit) {
    if (unit === "L") return "liters";
    const key = String(unit || "").toLowerCase();
    if (!units[key]) return "invalid unit";
    return units[key].spell;
  };

  this.convert = function (initNum, initUnit) {
    const n = Number(initNum);
    if (!isFinite(n)) return "invalid number";

    if (initUnit === "L") return n * units.l.factor;

    const key = String(initUnit || "").toLowerCase();
    if (!units[key]) return "invalid unit";

    return n * units[key].factor;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(
      returnUnit
    )}`;
  };
}

module.exports = ConvertHandler;
