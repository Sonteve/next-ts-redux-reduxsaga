import React from "react";
import styled from "styled-components";

interface Props {
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

const MarginBox = (props: Props) => {
  return <MarginBlock {...props}></MarginBlock>;
};
const MarginBlock = styled.div<Props>`
  margin-top: ${(props) => (props.marginTop ? props.marginTop : 0)}rem;
  margin-right: ${(props) => (props.marginRight ? props.marginRight : 0)}rem;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : 0)}rem;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : 0)}rem;
`;

export default MarginBox;
