import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_SINGLE_PRODUCT } from "redux/types";
import axios from "axios";

const UseGetSingleProduct = (setLoading, setProductNotFound) => {
  const dispatch = useDispatch();
  const { blockedUsers } = useSelector((state) => state.user);
  const { product_id } = useParams();
  let cancel;
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/product/singleProduct/${product_id}`, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      });
      if (blockedUsers && blockedUsers.includes(data.writer._id))
        setProductNotFound(true);
      else dispatch({ type: SET_SINGLE_PRODUCT, payload: data });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setProductNotFound(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    return () => cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product_id, blockedUsers]);
};

export default UseGetSingleProduct;
