import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

// PARSE FILTERS FROM URL AND SET TO STATE

const useParseFiltersFromURL = (setFilters, initialFilters) => {
  const location = useLocation();
  useEffect(() => {
    const queries = queryString.parse(location.search);
    console.log(queries);
    const queriesParseToArr = {};
    Object.keys(initialFilters).map(
      (category) =>
        (queriesParseToArr[category] =
          typeof queries[category] === "object"
            ? [...queries[category]]
            : queries[category]
            ? [queries[category]]
            : [])
    );
    if (queriesParseToArr.page.length === 0) queriesParseToArr.page = [1];
    if (queriesParseToArr.limit.length === 0) queriesParseToArr.limit = [8];
    setFilters(queriesParseToArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useParseFiltersFromURL;
