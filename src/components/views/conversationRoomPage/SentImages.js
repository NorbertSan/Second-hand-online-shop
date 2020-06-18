import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const StyledWrapper = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  img {
    width: 50px;
    margin-right: 5px;
  }
`;

const SentImages = ({ images: imagesId }) => {
  const [images, setImages] = useState(null);

  const download = async (imageName) => {
    const url = `${BASE_URL}/${imageName}`;
    const { data } = await axios.get(url, { responseType: "blob" });
    const downloadUrl = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", imageName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  useEffect(() => {
    setImages(
      imagesId.map((image, index) => (
        <img
          alt={`upload ${index}`}
          src={`${BASE_URL}/${image}`}
          onClick={() => download(image)}
          key={index}
        />
      ))
    );
  }, [imagesId]);
  if (imagesId.length === 0) return null;
  else return <StyledWrapper>{images}</StyledWrapper>;
};

SentImages.propTypes = {
  images: PropTypes.array.isRequired,
};

export default SentImages;
