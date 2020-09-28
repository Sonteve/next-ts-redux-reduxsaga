import React, { useCallback, useEffect, useState } from "react";
import { FcDocument } from "react-icons/fc";
import styled from "styled-components";
import Inquire from "./Inquire";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { initInquire } from "../reducers/inquire";

/* interface Props {    
} */

const FooterBlock = styled.div`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FooterTitle = styled.div`
  font-size: 16px;
  margin-bottom: 15px;
`;

const FooterContents = styled.div``;

const FooterContent = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  padding: 15px;
  margin: 0 40px;
  font-size: 20px;
  text-align: center;
  margin-bottom: 15px;
`;

const FooterAddress = styled.div`
  text-align: center;
`;

const InquireSuccess = styled.div`
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
`;

const Footer = () => {
  const dispatch = useDispatch();

  const { inquireContent, sendInquireLoading } = useSelector(
    ({ inquire }: RootState) => inquire
  );
  const [inquire, setInquire] = useState(false);
  const onClickInquire = useCallback(() => {
    console.log("문의하기");
    setInquire(true);
  }, []);

  const onCloseInquire = useCallback(() => {
    console.log("문의하기 닫기");
    dispatch(initInquire());
    setInquire(false);
  }, []);

  useEffect(() => {
    if (inquire) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible ";
    }
  });

  if (!sendInquireLoading && inquireContent) {
    return (
      <InquireSuccess>
        <div>문의가 성공적으로 전달되었습니다.</div>
        <div onClick={onCloseInquire}>닫기</div>
      </InquireSuccess>
    );
  }

  return (
    <FooterBlock>
      {inquire && <Inquire onClickClose={onCloseInquire} />}
      <FooterTitle>AGRIPA에 궁금하신 점이 있으신가요?</FooterTitle>
      <FooterContents>
        <FooterContent onClick={onClickInquire}>
          <FcDocument />
          문의하기
        </FooterContent>
        <FooterContent>
          <>로고</>
        </FooterContent>
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
