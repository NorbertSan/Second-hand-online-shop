import { useEffect } from "react";
import axios from "axios";
import { queries } from "@testing-library/react";

const UseGetProducts = (quries, params, setProducts, setLoading, setPages) => {
  useEffect(() => {
    let cancel;

    setLoading(true);
    axios
      .post("/product", quries, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setProducts(res.data.products);
        setPages(parseInt(res.data.pages));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
    return () => cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, params);
};

export default UseGetProducts;
