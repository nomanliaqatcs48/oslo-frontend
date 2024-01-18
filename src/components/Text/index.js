/**
 *
 * Text
 *
 */

import React from 'react';
import styled from 'styled-components';

const CustomText = styled.p`
color: ${({ theme }) => theme.text};
font-family: Roboto;
font-size:  ${props => `${props.size}px` || '16px'};
font-style: normal;
font-weight: ${props => props.weight || 500};
line-height: ${props => `${props.lineHeight}px` || '24px'};

`;

function Text(props) {
  const { label } = props;
  return <CustomText {...props}>{label}</CustomText>;
}

export default Text;
