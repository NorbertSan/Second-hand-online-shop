import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import theme from "utils/theme";
import PropTypes from "prop-types";
import queryString from "query-string";
// SCROLL STUFFS
import Scroll from "react-scroll";
const scroll = Scroll.animateScroll;

const StyledWrapper = styled.section`
  display: flex;
  justify-content: center;
  border-top: 1px solid #eee;
  width: 200px;
  margin: auto;
  padding-top: 15px;
  span {
    margin: 0 5px;
    &.active {
      font-weight: bold;
      color: ${theme.colors.secondary};
    }
  }
`;

const PageNavigation = ({ maxPages }) => {
  const location = useLocation();
  const history = useHistory();
  const queries = queryString.parse(location.search);
  const [currentPage, setCurrentPage] = useState();

  const handleSetCurrentPage = (e) => {
    scroll.scrollToTop({ duration: 200 });
    const previousPage = queries.page;
    const newPage = parseInt(e.target.attributes.number.value);
    const pathname = location.pathname;
    const newURL = `${pathname}/${location.search.replace(
      `page=${previousPage}`,
      `page=${newPage}`
    )}`;
    history.push(newURL);
  };

  useEffect(() => {
    setCurrentPage(parseInt(queries.page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
  return (
    <StyledWrapper>
      {currentPage > 1 && (
        <span number={1} onClick={handleSetCurrentPage}>
          1
        </span>
      )}
      {currentPage > 3 && <span>...</span>}
      {currentPage > 2 && (
        <span number={currentPage - 1} onClick={handleSetCurrentPage}>
          {currentPage - 1}
        </span>
      )}
      <span
        number={currentPage}
        className="active"
        onClick={handleSetCurrentPage}
      >
        {currentPage}
      </span>
      {currentPage < maxPages && (
        <span number={currentPage + 1} onClick={handleSetCurrentPage}>
          {currentPage + 1}
        </span>
      )}
      {maxPages - currentPage > 2 && <span>...</span>}
      {maxPages > currentPage + 1 && (
        <span number={maxPages} onClick={handleSetCurrentPage}>
          {maxPages}
        </span>
      )}
    </StyledWrapper>
  );
};

PageNavigation.propTypes = {
  maxPages: PropTypes.number.isRequired,
};

export default PageNavigation;
