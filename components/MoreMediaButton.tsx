import React from "react";
import styled from "styled-components";

const MoreMediaButtonBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  /* padding: 0 20px; */
`;

const MoreButton = styled.div`
  /* padding: 5px 20px; */
  border: 1px solid black;
  border-radius: 5px;
  font-size: 18px;
  padding: 5px 20px;
  background: #eee;
`;

interface Props {
  getMoreYoutubeData?: () => void;
  getMoreNewsData?: () => void;
}
const MoreMediaButton = ({ getMoreNewsData, getMoreYoutubeData }: Props) => {
  return (
    <MoreMediaButtonBlock>
      {getMoreNewsData && (
        <MoreButton onClick={getMoreNewsData}>더보기</MoreButton>
      )}
      {getMoreYoutubeData && (
        <MoreButton onClick={getMoreYoutubeData}>더보기</MoreButton>
      )}
      {!getMoreNewsData && !getMoreYoutubeData && (
        <MoreButton>더보기</MoreButton>
      )}
    </MoreMediaButtonBlock>
  );
};

export default MoreMediaButton;
