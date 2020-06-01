import { useEffect } from "react";
import axios from "axios";

const UseGetSales = (setSales, setLoading) => {
  const fetchSales = async () => {
    try {
      const { data } = await axios.get("/payment/sales");
      setSales(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default UseGetSales;
