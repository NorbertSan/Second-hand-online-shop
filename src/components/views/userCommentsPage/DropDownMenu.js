import React, { useRef, useState } from "react";
import theme from "utils/theme";
import PropTypes from "prop-types";
import styled from "styled-components";
// ICONS
import BinIcon from "assets/icons/bin.svg";
import EditIcon from "assets/icons/edit.svg";
// HOOK
import useDetectClickOutside from "hooks/useDetectClickOutside";
// COMPONENTS
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";
import GreyBackground from "components/atoms/GreyBackground";

const StyledWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  top: 25px;
  width: 150px;
  right: 0;
  background: #fff;
  box-shadow: 0 0 3px grey;
  display: flex;
  flex-direction: column;
`;
const StyledOption = styled.li`
  color: grey;
  text-align: start;
  padding: 10px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background: #eee;
  }
  li:last-child {
    border: none;
  }
  &.danger {
    color: ${theme.colors.redish};
  }
`;
const StyledIcon = styled.img`
  width: 15px;
  height: 15px;
`;

const DropDownMenu = ({ toggleDropDownMenu, comment_id }) => {
  const [isDeleteModalOpen, toggleDeleteModalOpen] = useState(false);
  const [isEditModalOpen, toggleEditModalOpen] = useState(false);
  const dropDownRef = useRef(null);
  useDetectClickOutside(dropDownRef, toggleDropDownMenu);
  return (
    <>
      {isDeleteModalOpen && <GreyBackground />}
      <StyledWrapper ref={dropDownRef}>
        {isEditModalOpen && (
          <EditComment
            comment_id={comment_id}
            toggleDropDownMenu={toggleDropDownMenu}
          />
        )}
        {isDeleteModalOpen && <DeleteComment comment_id={comment_id} />}
        <StyledOption onClick={() => toggleEditModalOpen(true)}>
          <span>Edit</span>
          <StyledIcon src={EditIcon} alt="edit icon" />
        </StyledOption>
        <StyledOption
          onClick={() => toggleDeleteModalOpen(true)}
          className="danger"
        >
          <span>Delete</span>
          <StyledIcon src={BinIcon} alt="bin icon" />
        </StyledOption>
      </StyledWrapper>
    </>
  );
};

DropDownMenu.propTypes = {
  toggleDropDownMenu: PropTypes.func.isRequired,
  comment_id: PropTypes.string.isRequired,
};

export default DropDownMenu;
