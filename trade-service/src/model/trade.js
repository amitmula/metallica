const Joi = require('joi');

const schema = Joi.object().keys({
    tradeId: Joi.number(),
    tradeDate: Joi.date().required(),
    commodity: Joi.string().required(),
    side: Joi.string().valid('Buy', 'Sell'),
    counterParty: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    location : Joi.string().required(),
    status: Joi.string().required()
});

export default class Trade {    
    constructor(_trade) {
        console.log('inside trade constructor');
        this.tradeDate = _trade.tradeDate;
        this.commodity = _trade.commodity;
        this.side = _trade.side;
        this.counterParty = _trade.counterParty;
        this.price = _trade.price;
        this.quantity = _trade.quantity;
        this.location = _trade.location;
        this.status = _trade.status;
        console.log('Trade constructor called');
    }
    validate() {
        return Joi.validate(this, schema)
    }
}
