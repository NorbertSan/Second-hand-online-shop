import React, { useEffect, useState } from "react";
import theme from "utils/theme";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as Star } from "assets/icons/star.svg";
import { ReactComponent as HalfStar } from "assets/icons/halfStar.svg";
const stars = [1, 2, 3, 4, 5];
const StyledWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;
const StyledStarsWrapper = styled.div`
  display: flex;
`;
const StyledStar = styled(Star)`
  width: 23px;
  height: 23px;
  margin-left: 4px;
  z-index: 3;
  path {
    fill: grey;
    stroke: #e5e5e5;
  }
  &.filled path {
    fill: ${theme.colors.gold};
  }
`;
const StyledHalfStar = styled(HalfStar)`
  width: 23px;
  height: 23px;
  margin-left: 4px;
  path {
    stroke: #e5e5e5;
  }
`;
const StyledTitle = styled.h5`
  margin: 6px 0;
`;

const AverageStars = ({ comments }) => {
  const [starsAverage, setStarsAverage] = useState(0.3);
  useEffect(() => {
    const sumStars = comments.reduce(
      (result, comment) => (result += comment.stars),
      0
    );

    const average = sumStars / comments.length;
    setStarsAverage(average);
  }, [comments]);
  return (
    <StyledWrapper>
      <StyledTitle>{starsAverage.toFixed(1)} / 5.0</StyledTitle>
      <StyledStarsWrapper>
        {stars.map((star) =>
          star - starsAverage > 0.25 && star - starsAverage < 0.75 ? (
            <StyledHalfStar />
          ) : (
            <StyledStar
              className={star <= starsAverage + 0.25 && "filled"}
              key={star}
            />
          )
        )}
      </StyledStarsWrapper>
    </StyledWrapper>
  );
};

AverageStars.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default AverageStars;
