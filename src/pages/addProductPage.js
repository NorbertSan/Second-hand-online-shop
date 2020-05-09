import React, { useState } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import { useHistory } from "react-router-dom";

import { addProductValidator } from "utils/validators";
// COMPONENTS
import Input from "components/atoms/Input";
import Button from "components/atoms/Button";
import Textarea from "components/atoms/Textarea";
import UploadFile from "components/molecules/UploadFile";
import ValidateAlert from "components/atoms/ValidateAlert";
import AddProductAlert from "components/molecules/AddProductAlert";
import Loader from "react-loader-spinner";
// REDUX STUFF
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "redux/actions/dataActions";

const types = [
  { key: 1, value: "shirt" },
  { key: 2, value: "dress" },
  { key: 3, value: "trousers" },
  { key: 4, value: "shoes" },
];
const conditions = [
  { key: 1, value: "new" },
  { key: 2, value: "little used" },
  { key: 3, value: "used" },
];
const genders = [
  { key: 1, value: "male" },
  { key: 2, value: "female" },
];

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
  border: none;
  box-shadow: 0 0 1px grey;
`;
const StyledSelectWrapper = styled.div`
  margin-top: 10px;
  display: flex;
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

const AddProductPage = () => {
  const userId = useSelector((state) => state.user._id);
  const success = useSelector((state) => state.UI.successAddProduct);
  const serverError = useSelector((state) => state.UI.errorsAddProduct);
  const loading = useSelector((state) => state.UI.loadingAddProduct);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputsValue, setInputsValue] = useState({
    brand: "",
    price: 0,
    description: "",
    type: types[0].value,
    condition: conditions[0].value,
    gender: genders[0].value,
    images: [],
  });
  const handleInputChange = (e) =>
    setInputsValue({ ...inputsValue, [e.target.name]: e.target.value });

  const handlePriceChange = (e) =>
    setInputsValue({ ...inputsValue, price: parseInt(e.target.value) });

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputsValue({ ...inputsValue, price: parseInt(inputsValue.price) });
    const validateErrors = addProductValidator(inputsValue);
    setErrors(validateErrors);
    if (Object.keys(validateErrors).length > 0) return;
    const data = {
      writer: userId,
      ...inputsValue,
    };
    dispatch(addProduct(data, history));
  };
  const setImagesHandle = (files) => {
    setInputsValue({ ...inputsValue, images: files });
  };
  return (
    <StyledWrapper onSubmit={handleSubmit}>
      {success && <AddProductAlert success text={success} />}
      {serverError && <AddProductAlert error text={serverError} />}
      <StyledTitle>Sell cloth form</StyledTitle>
      <UploadFile refreshFunction={setImagesHandle} />
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
          onChange={handlePriceChange}
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
