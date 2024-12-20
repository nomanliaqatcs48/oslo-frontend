/**
 *
 * Button
 *
 */

import React from "react";
import styled from "styled-components";

const CustomButton = styled.button`
  padding: 9px 0px;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid #cfb577;
  outline: none;
  border-radius: 9999px;
  background: ${(props) =>
    props.secondary ? "transparent" : props.theme.primaryBtn};
  color: ${(props) => (props.secondary ? props.theme.text : "#FFF")};
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.55 : 1)};
  @media (max-width: 991px) {
    padding: 6px 0px;
    font-size: 0.9rem;
  }
`;

function Button(props) {
  const { label } = props;
  return <CustomButton {...props}>{label}</CustomButton>;
}

export default Button;
