import React from "react";
import styled from "styled-components";

interface Props {
  height?: number;
}

const UnderLine = ({ height = 1 }: Props) => {
  return <UnderLineBlock height={height}></UnderLineBlock>;
};

export default UnderLine;

const UnderLineBlock = styled.div<Props>`
  background-color: #ececec;
  height: ${(props) => props.height}rem;
  width: 100%;
`;
