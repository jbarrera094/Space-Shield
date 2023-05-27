import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

// SDK de Mercado Pago
const mercadopago = require("mercadopago");

// Agrega credenciales
const { prod_access_token } = serverRuntimeConfig.mercadopago;
mercadopago.configure({
  access_token: prod_access_token,
});


// Crea un objeto de preferencia
let preference = {
  items: [
    {
      title: "Space Shield",
      unit_price: 159900,
      quantity: 1,
    },
  ],
};

mercadopago.preferences
  .create(preference)
  .then(function (response) {
    // Este valor reemplazará el string "<%= global.id %>" en tu HTML
    global.id = response.body.id;
})
  .catch(function (error) {
    console.log(error);
});


export default mercadopago;