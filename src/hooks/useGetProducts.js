import { useEffect } from "react";
import axios from "axios";

const UseGetProducts = (queries, params, setProducts, setLoading, setPages) => {
  let cancel;
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/product", queries, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      });
      setProducts(res.data.products);
      setPages(parseInt(res.data.pages));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
    return () => cancel();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, params);
};

export default UseGetProducts;
