const Joi = require('joi');

const schema = Joi.object().keys({
    symbol: Joi.string().required(),
    name: Joi.string().required()
});

export default class Commodity {    
    constructor(_counterParty) {
        console.log('inside Commodity constructor');
        this.symbol = _counterParty.symbol;
        this.name = _counterParty.name;
        console.log('Commodity constructor called');
    }
    validate() {
        return Joi.validate(this, schema)
    }
}
