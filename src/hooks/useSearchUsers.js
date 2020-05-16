import { useEffect } from "react";
import axios from "axios";

const UseSearchUsers = (setUserNickNameList, inputValue) => {
  let cancel;
  const fetchUserNames = async () => {
    try {
      const res = await axios.get(`/user/search/${inputValue}`, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      });
      const mappedData = res.data
        ? res.data.reduce(
            (result, user) => [...result, { value: user.nickName }],
            []
          )
        : [];
      console.log(mappedData);
      setUserNickNameList(mappedData);
    } catch (err) {
      if (axios.isCancel(err)) return;
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUserNames();
    return () => cancel();
  }, [inputValue]);
};

export default UseSearchUsers;
