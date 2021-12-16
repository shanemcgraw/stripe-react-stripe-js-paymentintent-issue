const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

app.use(express.static("public"));
app.use(express.json());

/*
NOTE: I've removed this function to focus on the fact that the client is updating something to change the amount, but
this could easily be added in and replaced with a change in items (to then use this function to change the amount)

const calculateOrderAmount = (items) => {
  return 1400;
};
*/

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));
