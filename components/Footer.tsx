import React, { useCallback /* , useEffect, useState  */ } from "react";
import styled from "styled-components";
/* import Inquire from "./Inquire"; */
/* import { RootState } from "../reducers";
import { initInquire } from "../reducers/inquire"; */
import Router from "next/router";

/* interface Props {    
} */

const FooterBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/* const FooterTitle = styled.div`
  font-size: 16px;
  margin-bottom: 15px;
`; */

const FooterContents = styled.div`
  width: 100%;
`;

/* const FooterContent = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  padding: 15px;
  margin: 0 40px;
  font-size: 20px;
  text-align: center;
  margin-bottom: 15px;
`; */

const FooterAddress = styled.div`
  text-align: center;
  background-color: #ececec;
  padding: 1rem 0;
`;

/* const InquireSuccess = styled.div`
  display: flex;
  background: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 1px solid black;
  border-radius: 10px;
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`; */

/* const SuccessBlock = styled.div`
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
`; */

const Footer = () => {
  const onClickInquire = useCallback(() => {
    console.log("문의하기");
    Router.push("/inquire");
  }, []);

  /* if (!sendInquireLoading && inquireContent) {
    return (
      <SuccessBlock>
        <InquireSuccess>
          <div>문의가 성공적으로 전달되었습니다.</div>
          <div onClick={onCloseInquire}>닫기</div>
        </InquireSuccess>
      </SuccessBlock>
    );
  } */

  return (
    <FooterBlock>
      {/*  {inquire && <Inquire onClickClose={onCloseInquire} />} */}
      <FooterContents>
        <InquireArea onClick={onClickInquire}>
          <img src="footer_inquire.png" alt="문의하기" />
          {/* <FcDocument />
          문의하기
        </FooterContent>
        <FooterContent>
          <a
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              textDecoration: "none",
            }}
            href="http://pandac.co.kr/"
            target="_blank"
          >
            로고
          </a> */}
        </InquireArea>
        <FooterAddress>
          <div>
            주식회사 <strong>판다코퍼레이션</strong>
          </div>
          <div>대표자명 : 정규인</div>

          <div>
            대표번호 :{" "}
            <a href="tel:070-4166-6077" style={{ color: "#777" }}>
              070-4166-6077
            </a>
          </div>
          <div style={{ textAlign: "center" }}>
            Copyright ©2020 Panda Corporation.
            <br />
            All Rights Reserved
          </div>
        </FooterAddress>
      </FooterContents>
    </FooterBlock>
  );
};

export default Footer;

const InquireArea = styled.div`
  /* width: 100%; */
  text-align: center;
  cursor: pointer;
  & img {
    display: block;
    width: 100%;
  }
`;
