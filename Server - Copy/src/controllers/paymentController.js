const stripePayment = require('../services/paymentService');

const checkout = async (req, res) => {
    try {
        const data = req.body;
        const session = await stripePayment.createCheckoutSession(data);
        res.status(200).json({
            errCode: 0,
            checkoutURL: session.checkoutURL
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

const webhook = async (req, res) => {
    try {
        const data = req.body;
        const type = data.type;

        await stripePayment.eventHandler(data, type);

        res.status(200).json({
            errCode: 0,
            errMessage: 'Success'
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    checkout, webhook
}