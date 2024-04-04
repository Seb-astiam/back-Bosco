import { MercadoPagoConfig, Preference } from 'mercadopago';
require("dotenv").config();

const mercadoPagoConfig = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

export const createPreference = async (req, res) => {
    try {
        const body = {
            items: [{
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price),
                currency_id: "ARS",
            }],
            back_urls: {
                success: "https://www.google.com.ar",
                failure: "https://www.google.com.ar",
                pending: "https://www.google.com.ar",
            },
            auto_return: "approved"
        };

        const preference = new Preference(mercadoPagoConfig);
        const result = await preference.create({ body });
        res.json({ id: result.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "error al crear la preferencia :( " });
    }
};


