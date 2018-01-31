'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const Joi = require('joi');

const schema = Joi.object().keys({
    symbol: Joi.string().required(),
    name: Joi.string().required()
});

class Commodity {
    constructor(_counterParty) {
        console.log('inside Commodity constructor');
        this.symbol = _counterParty.symbol;
        this.name = _counterParty.name;
        console.log('Commodity constructor called');
    }
    validate() {
        return Joi.validate(this, schema);
    }
}
exports.default = Commodity;
//# sourceMappingURL=Commodity.js.map