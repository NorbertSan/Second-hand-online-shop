import React, { useState, useEffect } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SANDBOX_ID = process.env.REACT_APP_SANDBOX;
const env = "sandbox"; // you can set here to 'production' for production
const currency = "PLN"; // or you can set this value from your props or state

const Paypal = () => {
  const { product_id } = useParams();
  const [total, setTotal] = useState(0);
  const { shoppingList } = useSelector((state) => state.data);
  useEffect(() => {
    const product = shoppingList.find((item) => item._id === product_id);
    if (product) setTotal(parseFloat(product.price));
  }, [shoppingList, product_id, setTotal]);

  const onSuccess = (payment) => {
    console.log("The payment was succeeded!", payment);
  };

  const onCancel = (data) => {
    console.log("The payment was cancelled!", data);
  };

  const onError = (err) => {
    console.error("Error!", err);
  };

  const client = {
    sandbox: SANDBOX_ID,
    production: "YOUR-PRODUCTION-APP-ID",
  };

  if (!total) return null;

  return (
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={currency}
      total={total}
      onError={onError}
      onSuccess={onSuccess}
      onCancel={onCancel}
      locale="en_US"
      style={{
        color: "blue",
        shape: "rect",
        label: "checkout",
      }}
    />
  );
};

export default Paypal;
