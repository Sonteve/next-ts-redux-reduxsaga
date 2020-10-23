import React, {
  ChangeEvent,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { sendInquireAction } from "../reducers/inquire";
import moment from "moment";
/* import { isAndroid } from "react-device-detect"; */
import Router from "next/router";
import { RootState } from "../reducers";
import InquireModal from "../components/InquireModal";

interface SCprops {
  error: boolean;
}

const Inquire = () => {
  const dispatch = useDispatch();
  const { inquireContent } = useSelector(({ inquire }: RootState) => inquire);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailFormError, setEmailFormError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [contentError, setContentError] = useState<boolean>(false);
  const [termError, setTermError] = useState<boolean>(false);
  const [term, setTerm] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNameError(false);
    setName(e.target.value);
  }, []);
  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setEmailFormError(false);
    setEmail(e.target.value);
  }, []);
  const onChangeContent = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContentError(false);
    setContent(e.target.value);
  }, []);

  const onChangeTerm = useCallback(() => {
    setTermError(false);
    setTerm((prev) => !prev);
  }, []);

  const onSubmitInquire = useCallback(() => {
    if (!name) {
      /* nameRef.current?.focus(); */
      setNameError(true);
      /* return console.log("이름을 입력해주세요."); */
    }

    if (!email) {
      /* emailRef.current?.focus(); */
      setEmailError(true);
      setEmailFormError(false);
    } else {
      const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if (email.match(regExp) === null) {
        setEmailError(true);
        setEmail("");
        setEmailFormError(true);
      }
    }

    if (!content) {
      /* contentRef.current?.focus(); */
      setContentError(true);
    }

    if (!term) {
      /* termRef.current?.focus(); */
      setTermError(true);
    }
    if (name && email && content && term) {
      dispatch(
        sendInquireAction.request({
          email,
          name,
          question: content,
          regiDate: moment(new Date()).format("YYYY-MM-DD"),
        })
      );
    }
  }, [name, email, content, term]);

  const onClickClose = useCallback(() => {
    Router.back();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <InquireBlock>
      {inquireContent && <InquireModal data={inquireContent} />}
      <InquireForm>
        <CloseButton onClick={onClickClose}>X</CloseButton>
        <InquireLogo>
          <img src="inquire_logo.png" alt="상세페이지 로고" />
        </InquireLogo>
        <Title>
          안녕하세요
          <br />
          문의사항을 입력해주세요
        </Title>
        <UserName error={nameError}>
          <input
            autoComplete="off"
            placeholder={nameError ? "이름을 입력해주세요." : "이름"}
            onChange={onChangeName}
            value={name}
            name="name"
            ref={nameRef}
          />
        </UserName>
        <UserEmail error={emailError}>
          <input
            autoComplete="off"
            type="email"
            ref={emailRef}
            placeholder={
              emailError
                ? emailFormError
                  ? "형식에 맞지 않는 이메일입니다. "
                  : "이메일을 입력해주세요."
                : "이메일"
            }
            onChange={onChangeEmail}
            value={email}
            name="email"
          />
        </UserEmail>
        <SubTitle>
          문의사항<span>{contentError ? "문의사항을 입력해주세요." : ""}</span>
        </SubTitle>
        <Questions>
          <textarea
            ref={textareaRef}
            onChange={onChangeContent}
            value={content}
            name="content"
          />
        </Questions>
        <SubTitle>
          약관동의<span>{termError ? "약관에 동의해주세요." : ""}</span>
        </SubTitle>
        <TermsOfUse>
          주식회사 판다코퍼레이션은 제품 문의사항 응대를 위해 아래와 같 이
          개인정보를 수집 및 이용합니다. 수집된 개인정보는 수집 및 이용목적 외의
          용도로 사용하지 않습니 다. 1.개인정보의 수집 및 이용 목적
          AGRIPA(아그리파) 서비스 문의 및 응대 2.수집하는 개인정보 항목 필수
          항목: 이름, 이메일 3.개인정보의 이용 및 보유기간 개인정보 이용 및
          보유기간이 경과하거나, 처리목적이 달성된 경우 에는 지체 없이 해당
          개인정보를 파기합니다. 보유기간 : 문의일로부터 3개월 4. 개인정보 수집
          동의 거부 권리 이용자는 개인정보 수집 및 이용에 대해 동의를 거부할 수
          있습니 다. 다만, 동의 거부시에는 서비스 문의가 제한됩니다.
        </TermsOfUse>
        <Check>
          <input
            type="checkbox"
            id="check"
            onChange={onChangeTerm}
            checked={term}
          />
          <label htmlFor="check">개인정보 수집 및 이용에 동의합니다</label>
        </Check>
      </InquireForm>
      <Submit onClick={onSubmitInquire}>문의하기</Submit>
    </InquireBlock>
  );
};

export default Inquire;

const SubTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 70c0;
  padding: 1rem 0;
  color: #555;
  background-color: #fff;
  & > span {
    color: red;
    font-size: 1.5rem;
    margin-left: 1.5rem;
  }
`;

const InquireLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 30%;
  }
`;

const InquireBlock = styled.div`
  position: absolute;
  z-index: 100;
  width: 100vw;

  top: 0;
  left: 0;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InquireForm = styled.div`
  width: 100%;
  /* transform: translate(-50%, -50%); */
  background-color: #fff;
  position: relative;
  left: 0;
  padding: 1rem;
  box-sizing: border-box;
`;

const Title = styled.div`
  text-align: left;
  font-size: 1.8rem;
  font-weight: 700;
  color: #555;
  margin: 2rem 0 1rem 0;
  /* height: 25px; */
  line-height: 1.2;
`;
const UserName = styled.div<SCprops>`
  & input {
    box-sizing: border-box;
    font-size: 15px;
    width: 100%;
    border: none;
    outline: none;
    height: 100%;
    padding: 1rem 0;
    background-color: transparent;

    &::placeholder {
      color: #d2d2d2;

      ${(props) =>
        props.error &&
        css`
          color: red;
        `}
    }
  }
  background-color: transparent;
  border-bottom: 1px solid #d2d2d2;
`;
const UserEmail = styled.div<SCprops>`
  & input {
    box-sizing: border-box;
    font-size: 15px;
    width: 100%;
    border: none;
    outline: none;
    height: 100%;
    padding: 1rem 0;
    background-color: transparent;

    &::placeholder {
      color: #d2d2d2;

      ${(props) =>
        props.error &&
        css`
          color: red;
        `}
    }
    margin-top: 1rem;
  }
  background-color: transparent;
  border-bottom: 1px solid #d2d2d2;
`;
const Questions = styled.div`
  & textarea {
    box-sizing: border-box;
    font-size: 15px;
    width: 100%;
    border: none;
    outline: none;
    padding: 1rem 0;
    background-color: #fff;
    resize: none;
    height: 14rem;

    /*  &::placeholder {
        color: #d2d2d2;
      } */
    border: 1px solid #d2d2d2;
  }
  background-color: transparent;
`;
const TermsOfUse = styled.div`
  font-size: 1.2rem;
  /* height: 90px;
    margin-bottom: 5%; */
  overflow-y: scroll;
  border: 1px solid #d2d2d2;
  padding: 3px;
  background-color: #fff;
  height: 7rem;
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  font-size: 1.3rem;
  font-weight: 100;
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  background-color: transparent;
`;

const Check = styled.div`
  & label {
    font-size: 1.2rem;
    font-weight: 700;
  }

  & input {
    margin: 1rem;
  }
  display: flex;
  align-items: center;
  /* height: 25px;
    margin-bottom: 10%; */
  /* margin-bottom: vh; */
`;

const Submit = styled.button`
  font-size: 1.6rem;
  padding: 2rem;
  font-weight: 700;
  width: 100vw;
  border: none;
  background-color: #4eac62;
  color: #fff;
  /* & > div {
      border: 1px solid black;
      border-radius: 5px;
      font-size: 18px;
      text-align: center;
      padding: 5px 20px;
    } */
  /* margin-bottom: 6%; */
`;
