import { useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const UseGetUsersFromIds = (setUsers, usersIds, selectedEmoji) => {
  let cancel;
  const fetchUsers = async () => {
    try {
      const { data } = await axios.post(
        "/user/users/ids",
        { usersIds },
        {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        }
      );
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUsers();
    return () => cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersIds, selectedEmoji]);
};

UseGetUsersFromIds.propTypes = {
  setUsers: PropTypes.func.isRequired,
  usersIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default UseGetUsersFromIds;
