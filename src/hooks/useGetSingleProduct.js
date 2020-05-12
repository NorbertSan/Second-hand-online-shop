import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const BASE_URL = "http://localhost:5000/";
axios.defaults.baseURL = BASE_URL;
const UseGetSingleProduct = (setProduct, setLoading, setError) => {
  const params = useParams();
  const id = params.product_id;
  let cancel;
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/product/${id}`, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      });
      setProduct(res.data);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProduct();
    return () => cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default UseGetSingleProduct;
