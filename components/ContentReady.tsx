import React from "react";
import { GiSandsOfTime } from "react-icons/gi";
import { FcDocument } from "react-icons/fc";
import styled from "styled-components";

const ContentReadyBlock = styled.div`
  margin: 15px;
  padding: 15px;
  border: 1px solid black;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InquireButton = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  font-size: 18px;
  text-align: center;
  padding: 5px 20px;
`;

const ContentReady = () => {
  return (
    <ContentReadyBlock>
      <GiSandsOfTime style={{ fontSize: "40px" }} />
      <div>정보 준비 중</div>
      <div>현재 해당 정보 제공 준비 중입니다.</div>
      <InquireButton>
        <FcDocument />
        문의하기
      </InquireButton>
    </ContentReadyBlock>
  );
};

export default ContentReady;
