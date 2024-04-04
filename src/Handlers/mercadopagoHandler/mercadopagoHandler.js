// mercadopagoHandler.js

import { createPreference } from '../../Controllers/mercadopagoController/mercadopagoController';

export const mercadopagoHandler = (app) => {
    app.post("/create_preference", createPreference);
};
