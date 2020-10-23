import React, { useCallback } from "react";
import styled from "styled-components";
import Router from "next/router";

interface Props {
  data: string;
}

const InquireModal = ({ data }: Props) => {
  const onClickConfirmButton = useCallback(() => {
    Router.back();
  }, []);
  return (
    <InquireModalBlock>
      {data && (
        <InquireSuccessForm>
          <div>
            {data === "success" ? "성공적으로 전송되었습니다." : "에러"}
          </div>
          <button onClick={onClickConfirmButton}>확인</button>
        </InquireSuccessForm>
      )}
    </InquireModalBlock>
  );
};

export default InquireModal;

const InquireModalBlock = styled.div`
  position: fixed;
  z-index: 999;
  background: rgba(255, 255, 255, 0.5);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InquireSuccessForm = styled.div`
  padding: 2rem 2rem 1rem 2rem;
  width: 70vw;
  height: 20vw;
  background: #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    margin-bottom: 1.5rem;
  }

  & > button {
    border: 1px solid black;
    background-color: green;
    padding: 1rem 4rem;
  }
`;
