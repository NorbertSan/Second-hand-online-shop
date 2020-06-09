import { useEffect } from "react";
import axios from "axios";

const UseGetBrands = (setBrands) => {
  const fetchBrands = async () => {
    try {
      const { data } = await axios.get("/product/brands");
      setBrands(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default UseGetBrands;
