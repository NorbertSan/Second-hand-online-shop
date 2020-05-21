/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";

const UseGetProductsFromIdsArray = (
  productsIds,
  setProductsToLocalState,
  setProductsToGlobalState,
  extraParams,
  setLoading
) => {
  let cancel;
  const limit = 8;
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    try {
      const res = await axios.post(
        "/product/products/Ids",
        { limit, page, productsIds },
        {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        }
      );
      setProductsToLocalState &&
        setProductsToLocalState((prevState) => [...prevState, ...res.data]);
      setProductsToGlobalState && setProductsToGlobalState(res.data);
      setLoading && setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMoreOnEndPage = () => {
    const spaceDown = document.body.offsetHeight - window.innerHeight;
    const presentPosition = window.scrollY;
    if (presentPosition + 60 > spaceDown && productsIds.length / limit > page)
      setPage((prevState) => prevState + 1);
  };
  useEffect(() => {
    fetchProducts();
    document.addEventListener("scroll", fetchMoreOnEndPage);
    return () => {
      cancel && cancel();
      document.removeEventListener("scroll", fetchMoreOnEndPage);
    };
  }, [page, ...extraParams]);
};

export default UseGetProductsFromIdsArray;
