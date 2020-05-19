import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const UseSearchUsers = (
  setUserNickNameList,
  inputValue,
  searchType,
  disableYourself = false
) => {
  const loggedNickName = useSelector((state) => state.user.nickName);
  let cancel;
  const fetchUserNames = async () => {
    try {
      const res = await axios.get(`/user/search/${inputValue}`, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      });
      const mappedData = res.data
        ? res.data.reduce((result, user) => {
            if (disableYourself && loggedNickName === user.nickName)
              return result;
            else return [...result, { value: user.nickName }];
          }, [])
        : [];
      setUserNickNameList(mappedData);
    } catch (err) {
      if (axios.isCancel(err)) return;
      console.error(err);
    }
  };
  useEffect(() => {
    if (searchType === "user") {
      fetchUserNames();
      return () => cancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);
};

export default UseSearchUsers;
