import React from "react";
import { Instagram } from "react-content-loader";

const ProductsSkeleton = () => {
  return (
    <>
      <Instagram backgroundColor="rgba(0,0,0,0.05)" foregroundColor="#eee" />
      <Instagram backgroundColor="rgba(0,0,0,0.05)" foregroundColor="#eee" />
      <Instagram backgroundColor="rgba(0,0,0,0.05)" foregroundColor="#eee" />
      <Instagram backgroundColor="rgba(0,0,0,0.05)" foregroundColor="#eee" />
    </>
  );
};

export default ProductsSkeleton;
