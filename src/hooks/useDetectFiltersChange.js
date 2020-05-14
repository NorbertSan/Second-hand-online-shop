import { useEffect } from "react";
import { useHistory } from "react-router-dom";

// DETECT FILTERS CHANGES AND CHANGE URL

const useDetectFiltersChange = (filters) => {
  const history = useHistory();
  useEffect(() => {
    let newUrl = "/products?";
    Object.keys(filters).map(
      (category) =>
        filters[category].length > 0 &&
        filters[category].map((filter) => (newUrl += `&${category}=${filter}`))
    );
    history.push(newUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);
};

export default useDetectFiltersChange;
