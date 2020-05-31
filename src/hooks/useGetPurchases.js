import { useEffect } from "react";
import axios from "axios";

const UseGetPurchases = (setPurchases, setLoading) => {
  const fetchPurchases = async () => {
    try {
      const { data } = await axios.get("/payment");
      setPurchases(data);
      console.log(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchPurchases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default UseGetPurchases;
