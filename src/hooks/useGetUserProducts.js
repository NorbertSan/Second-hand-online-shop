/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";

const UseGetUserProducts = (productsIds, setUserProducts, setLoading) => {
  let cancel;
  const limit = 8;
  const [page, setPage] = useState(1);
  const fetchUserProducts = async () => {
    try {
      const res = await axios.post(
        "/product/user",
        { limit, page, productsIds },
        {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        }
      );
      setUserProducts((prevState) => [...prevState, ...res.data]);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const listener = () => {
    const spaceDown = document.body.offsetHeight - window.innerHeight;
    const presentPosition = window.scrollY;
    if (presentPosition + 60 > spaceDown && productsIds.length / limit > page)
      setPage((prevState) => prevState + 1);
  };
  useEffect(() => {
    fetchUserProducts();
    document.addEventListener("scroll", listener);
    return () => {
      cancel && cancel();
      document.removeEventListener("scroll", listener);
    };
  }, [page]);
};

export default UseGetUserProducts;
