import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SET_PRODUCTS, LOADING_PRODUCTS } from "redux/types";

const UseGetProducts = (
  queries,
  params,
  clearPrevious,
  setPages,
  setFetchMore
) => {
  const dispatch = useDispatch();
  let cancel;
  const fetchProducts = async () => {
    dispatch({ type: LOADING_PRODUCTS });
    try {
      const res = await axios.post("/product", queries, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      });
      dispatch({
        type: SET_PRODUCTS,
        payload: { products: res.data.products, clearPrevious },
      });
      setPages && setPages(parseInt(res.data.pages));
      setFetchMore &&
        setFetchMore(
          res.data.products.length === 0
            ? false
            : res.data.products.length % queries.limit === 0
        );
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchProducts();
    return () => cancel();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, params);
};

export default UseGetProducts;
