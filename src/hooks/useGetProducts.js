import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SET_PRODUCTS, LOADING_PRODUCTS } from "redux/types";

const UseGetProducts = (
  queries,
  params,
  clearPrevious,
  setPages,
  setFetchMore
) => {
  const { blockedUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let cancel;
  const fetchProducts = async () => {
    dispatch({ type: LOADING_PRODUCTS });
    try {
      const {
        data: { products, pages },
      } = await axios.post("/product", queries, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      });
      const filterProducts = products.reduce((result, current) => {
        if (blockedUsers && blockedUsers.includes(current.writer._id))
          return result;
        else return [...result, current];
      }, []);
      dispatch({
        type: SET_PRODUCTS,
        payload: { products: filterProducts, clearPrevious },
      });
      setPages && setPages(parseInt(pages));
      setFetchMore &&
        setFetchMore(
          filterProducts.length === 0
            ? false
            : filterProducts.length % queries.limit === 0
        );
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchProducts();
    return () => cancel();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...params, blockedUsers]);
};

export default UseGetProducts;
