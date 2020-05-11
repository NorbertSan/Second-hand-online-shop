import React from "react";
import styled from "styled-components";
import theme from "utils/theme";
import PropTypes from "prop-types";

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

const PageNavigation = ({ page, setPage, maxPages }) => {
  const handleSetPage = (e) =>
    setPage(parseInt(e.target.attributes.number.value));
  return (
    <StyledWrapper>
      {page > 1 && (
        <span number={1} onClick={handleSetPage}>
          1
        </span>
      )}

      {page > 3 && <span>...</span>}

      {page > 2 && (
        <span number={page - 1} onClick={handleSetPage}>
          {page - 1}
        </span>
      )}

      <span number={page} className="active" onClick={handleSetPage}>
        {page}
      </span>

      {page < maxPages && (
        <span number={page + 1} onClick={handleSetPage}>
          {page + 1}
        </span>
      )}
      {maxPages - page > 2 && <span>...</span>}
      {maxPages > page + 1 && (
        <span number={maxPages} onClick={handleSetPage}>
          {maxPages}
        </span>
      )}
    </StyledWrapper>
  );
};

PageNavigation.propTypes = {
  page: PropTypes.number.isRequired,
  maxPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default PageNavigation;
