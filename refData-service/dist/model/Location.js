'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const Joi = require('joi');

const schema = Joi.object().keys({
    symbol: Joi.string().required(),
    name: Joi.string().required()
});

class Location {
    constructor(_location) {
        console.log('inside Location constructor');
        this.symbol = _location.symbol;
        this.name = _location.name;
        console.log('Location constructor called');
    }
    validate() {
        return Joi.validate(this, schema);
    }
}
exports.default = Location;
//# sourceMappingURL=Location.js.map