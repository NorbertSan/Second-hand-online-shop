import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "utils/theme";

import { addProductValidator } from "utils/validators";
// COMPONENTS
import Input from "components/atoms/Input";
import Button from "components/atoms/Button";
import Textarea from "components/atoms/Textarea";
import UploadFile from "./UploadFile";
import ValidateAlert from "components/atoms/ValidateAlert";
import AddProductAlert from "./AddProductAlert";
import Loader from "react-loader-spinner";
// REDUX STUFF
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "redux/actions/dataActions";
import { CLEAR_ERRORS_ADD_PRODUCT } from "redux/types";
// FILTERS
import { types, sizes, genders, conditions } from "utils/productFilterData";

// STYLES
const StyledWrapper = styled.form`
  padding: 15px;
  margin: 150px auto 30px;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.05);
`;

const StyledInnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const StyledTitle = styled.h3`
  text-align: center;
`;
const StyledSelect = styled.select`
  padding: 10px;
  background: #eee;
  color: grey;
  margin-right: 10px;
  margin-bottom: 5px;
  border: none;
  box-shadow: 0 0 1px grey;
`;
const StyledSelectWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const StyledInput = styled(Input)`
  width: 45%;
`;
const StyledButton = styled(Button)`
  margin-top: 15px;
`;
const StyledValidateAlert = styled(ValidateAlert)`
  margin-top: 10px;
  font-size: ${theme.fontSize.s};
  text-align: center;
`;

const initialState = {
  brand: "",
  price: "",
  description: "",
  type: types[0].value,
  condition: conditions[0].value,
  size: sizes[0].value,
  gender: genders[0].value,
  images: [],
};

const AddProductPage = () => {
  const userId = useSelector((state) => state.user._id);
  const success = useSelector((state) => state.UI.successAddProduct);
  const serverError = useSelector((state) => state.UI.errorsAddProduct);
  const loading = useSelector((state) => state.UI.loadingAddProduct);
  const [clearImages, setClearImages] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: CLEAR_ERRORS_ADD_PRODUCT });
  }, [dispatch]);

  const [inputsValue, setInputsValue] = useState(initialState);
  const handleInputChange = (e) =>
    setInputsValue({ ...inputsValue, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputsValue({
      ...inputsValue,
      price: parseFloat(parseFloat(inputsValue.price).toFixed(2)),
    });
    const validateErrors = addProductValidator(inputsValue);
    setErrors(validateErrors);
    if (Object.keys(validateErrors).length > 0) return;
    const data = {
      writer: userId,
      ...inputsValue,
    };
    dispatch(addProduct(data));
    setInputsValue(initialState);
    setClearImages(true);
  };
  const setImagesHandle = (files) => {
    setInputsValue({ ...inputsValue, images: files });
  };
  return (
    <StyledWrapper autoComplete="off" onSubmit={handleSubmit}>
      {success && <AddProductAlert success text={success} />}
      {serverError && <AddProductAlert error text={serverError} />}
      <StyledTitle>Sell cloth form</StyledTitle>
      <UploadFile refreshFunction={setImagesHandle} clearImages={clearImages} />
      <StyledInnerWrapper>
        <StyledInput
          type="text"
          tertiary
          placeholder="brand"
          name="brand"
          value={inputsValue.brand}
          onChange={handleInputChange}
        />
        <StyledInput
          type="number"
          tertiary
          placeholder="price PLN"
          name="price"
          value={inputsValue.price}
          onChange={handleInputChange}
        />
      </StyledInnerWrapper>
      <Textarea
        placeholder="Short description"
        name="description"
        value={inputsValue.description}
        onChange={handleInputChange}
      />
      <StyledSelectWrapper>
        <StyledSelect
          value={inputsValue.type}
          onChange={handleInputChange}
          name="type"
        >
          {types.map((type) => (
            <option key={type.key} value={type.value}>
              {type.value}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect
          value={inputsValue.condition}
          onChange={handleInputChange}
          name="condition"
        >
          {conditions.map((condition) => (
            <option key={condition.key} value={condition.value}>
              {condition.value}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect
          value={inputsValue.size}
          onChange={handleInputChange}
          name="size"
        >
          {sizes.map((size) => (
            <option key={size.key} value={size.value}>
              {size.value}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect
          value={inputsValue.gender}
          onChange={handleInputChange}
          name="gender"
        >
          {genders.map((gender) => (
            <option value={gender.value} key={gender.key}>
              {gender.value}
            </option>
          ))}
        </StyledSelect>
      </StyledSelectWrapper>
      <StyledButton tertiary>
        {loading ? (
          <Loader
            type="ThreeDots"
            color={theme.colors.secondary}
            height={15}
            width={60}
          />
        ) : (
          "Create advert"
        )}
      </StyledButton>
      {errors.general && (
        <StyledValidateAlert>{errors.general}</StyledValidateAlert>
      )}
    </StyledWrapper>
  );
};

export default AddProductPage;
