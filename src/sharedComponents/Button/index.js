/**
 *
 * Button
 *
 */

import React from 'react';
import styled from 'styled-components';

const CustomButton = styled.button`
  padding: 9px 0px;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid #cfb577;
  outline: none;
  border-radius: 9999px;
  background: #CFB577;
  color: #fff;s
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  cursor: pointer;

`;

// background: ${props => props.theme[props.color] || props.theme.primary};
// color: ${props => props.theme[props.color] || props.theme.white};
function Button(props) {
  const { label } = props;
  return <CustomButton {...props}>{label}</CustomButton>;
}

export default Button;
