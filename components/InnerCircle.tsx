import React from "react";
import styled from "styled-components";

const InnerCircle = () => {
  return <InnerCircleBlock />;
};

export default InnerCircle;

const InnerCircleBlock = styled.span`
  display: inline-block;
  width: 5px;
  height: 5px;
  background-color: #4eac62;
  border-radius: 50%;
  margin-right: 0.5rem;
`;
