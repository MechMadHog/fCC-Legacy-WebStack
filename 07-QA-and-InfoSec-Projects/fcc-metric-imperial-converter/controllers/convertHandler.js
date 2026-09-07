function ConvertHandler() {
  this.getNum = function(input) {
    const unitIndex = input.search(/[a-zA-Z]/);
    const numString = unitIndex === -1 ? input : input.slice(0, unitIndex);

    if (numString === '') return 1;

    const parts = numString.split('/');
    if (parts.length > 2) return 'invalid number';

    let result;
    if (parts.length === 2) {
      const numerator = Number(parts[0]);
      const denominator = Number(parts[1]);
      if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
        return 'invalid number';
      }
      result = numerator / denominator;
    } else {
      result = Number(numString);
    }

    return Number.isFinite(result) ? result : 'invalid number';
  };

  this.getUnit = function(input) {
    const unitIndex = input.search(/[a-zA-Z]/);
    if (unitIndex === -1) return 'invalid unit';

    const unit = input.slice(unitIndex).toLowerCase();
    const validUnits = {
      gal: 'gal',
      l: 'L',
      lbs: 'lbs',
      kg: 'kg',
      mi: 'mi',
      km: 'km'
    };

    return validUnits[unit] || 'invalid unit';
  };

  this.getReturnUnit = function(initUnit) {
    const units = {
      gal: 'L',
      L: 'gal',
      lbs: 'kg',
      kg: 'lbs',
      mi: 'km',
      km: 'mi'
    };

    return units[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const units = {
      gal: 'gallons',
      L: 'liters',
      lbs: 'pounds',
      kg: 'kilograms',
      mi: 'miles',
      km: 'kilometers'
    };

    return units[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal': result = initNum * galToL; break;
      case 'L': result = initNum / galToL; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'kg': result = initNum / lbsToKg; break;
      case 'mi': result = initNum * miToKm; break;
      case 'km': result = initNum / miToKm; break;
      default: return undefined;
    }

    return Number(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
