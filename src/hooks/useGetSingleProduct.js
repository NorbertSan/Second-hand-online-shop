import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_SINGLE_PRODUCT } from "redux/types";
import axios from "axios";

const BASE_URL = "http://localhost:5000/";
axios.defaults.baseURL = BASE_URL;

const UseGetSingleProduct = (setLoading, setError) => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.product_id;
  let cancel;
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/product/${id}`, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      });
      console.log(res.data);
      dispatch({ type: SET_SINGLE_PRODUCT, payload: res.data });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    return () => cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default UseGetSingleProduct;
