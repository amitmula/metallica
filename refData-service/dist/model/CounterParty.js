'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const Joi = require('joi');

const schema = Joi.object().keys({
    symbol: Joi.string().required(),
    name: Joi.string().required()
});

class CounterParty {
    constructor(_counterParty) {
        console.log('inside CounterParty constructor');
        this.symbol = _counterParty.symbol;
        this.name = _counterParty.name;
        console.log('CounterParty constructor called');
    }
    validate() {
        return Joi.validate(this, schema);
    }
}
exports.default = CounterParty;
//# sourceMappingURL=CounterParty.js.map