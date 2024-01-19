import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// created custom buttom using style components
const CustomBtn = (props) => {
  const navigate = useNavigate();
  const defaultValue = {
    link: props.to || "",
    value: props.value || "Button",
    btnColor: props.btnColor || "#F7C744",
    textColor: props.textColor || "#141003",
    margin: props.margin || "4px 2px",
    padding: props.padding || "10px 28px",
    size: props.size || "15px",
    weight: props.weight || "semibold",
    colourOnHover: props.colourOnHover || "#ff9c2a",
    bgOnHover: props.bgOnHover || "white",
  };
  // ${props => props.ratio}
  const CustomButton = styled.button`
    color: ${defaultValue.textColor};
    background-color: ${defaultValue.btnColor};
    padding: ${defaultValue.padding};
    margin: ${defaultValue.margin};
    font-size: ${defaultValue.size};
    font-weight: ${defaultValue.semibold};
    border: 1px solid ${defaultValue.btnColor};
    border-radius: 0.3rem;
    text-align: center;
    font-family: Poppins, sans-serif;
    &:hover {
      color: ${defaultValue.colourOnHover};
      background-color: ${defaultValue.textColor};
    }
  `;

  return (
    <>
      <CustomButton
        type="button"
        onClick={() => {
          navigate(defaultValue.link);
        }}
      >
        {defaultValue.value}
      </CustomButton>
    </>
  );
};

export default CustomBtn;
