import React from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";

const MoreMediaButtonBlock = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  /* padding: 0 20px; */
`;

const MoreButton = styled.div`
  /* padding: 5px 20px; */
  border: 1px solid #ececec;
  border-radius: 2rem;
  font-size: 18px;
  padding: 0.7rem 7rem;
  background: #fff;
  color: #555;
  cursor: pointer;
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
        <MoreButton>
          더보기 <IoIosArrowDown />
        </MoreButton>
      )}
    </MoreMediaButtonBlock>
  );
};

export default MoreMediaButton;
