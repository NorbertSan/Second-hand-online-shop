import { useEffect } from "react";
import { useSelector } from "react-redux";

const UseDetectUserBlocked = (setUserNotFound) => {
  const { blockedUsers } = useSelector((state) => state.user);
  const userData = useSelector((state) => state.data.userData);
  useEffect(() => {
    userData &&
      blockedUsers &&
      blockedUsers.includes(userData._id) &&
      setUserNotFound(true);
  }, [userData, blockedUsers, setUserNotFound]);
};

export default UseDetectUserBlocked;
