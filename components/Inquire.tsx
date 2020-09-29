import React, { ChangeEvent, useCallback, useState } from "react";
import styled from "styled-components";
import { FcDocument } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { sendInquireAction } from "../reducers/inquire";

const InquireBlock = styled.div`
  position: fixed;
  width: 100vw;
  height: 95vh;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  box-sizing: border-box;
  padding: 5%;
`;

const InquireForm = styled.div`
  width: 100%;
  height: 100%;
  /* transform: translate(-50%, -50%); */
  background: gray;
  border: 1px solid black;
  border-radius: 10px;
  position: relative;
  left: 0;
  padding: 10px;
  box-sizing: border-box;
`;

interface Props {
  onClickClose: () => void;
}

const Title = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
  text-align: center;
  font-size: 20px;
  height: 25px;
`;
const UserName = styled.div`
  & input {
    box-sizing: border-box;
    font-size: 15px;
    width: 100%;
    border: none;
    padding: 10px;
    border-radius: 8px;
    outline: none;
    height: 100%;
  }
  margin-bottom: 5%;
  height: 35px;
`;
const UserEmail = styled.div`
  & input {
    box-sizing: border-box;
    font-size: 15px;
    width: 100%;
    border: none;
    padding: 10px;
    border-radius: 8px;
    outline: none;
    height: 100%;
  }
  margin-bottom: 5%;
  height: 35px;
`;
const Questions = styled.div`
  & textarea {
    box-sizing: border-box;
    font-size: 15px;
    width: 100%;
    border: none;
    padding: 10px;
    border-radius: 8px;
    outline: none;
    height: 100%;
  }
  margin-bottom: 5%;
  height: 80px;
`;
const TermsOfUse = styled.div`
  padding: 10px;
  background: white;
  border-radius: 8px;
  font-size: 13px;
  height: 90px;
  margin-bottom: 5%;
  overflow-y: scroll;
`;

const CloseButton = styled.button`
  width: 25px;
  height: 25px;
  position: absolute;
  right: 10px;
  top: 10px;
`;

const Check = styled.div`
  & label {
    font-size: 14px;
    font-weight: bold;
  }
  height: 25px;
  margin-bottom: 10%;
`;

const Submit = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  & > div {
    border: 1px solid black;
    border-radius: 5px;
    font-size: 18px;
    text-align: center;
    padding: 5px 20px;
  }
  /* margin-bottom: 6%; */
`;

const Inquire = ({ onClickClose }: Props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [term, setTerm] = useState<boolean>(false);

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);
  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);
  const onChangeContent = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  const onChangeTerm = useCallback(() => {
    setTerm((prev) => !prev);
  }, []);

  const onSubmitInquire = useCallback(() => {
    console.log("문의 클릭");
    dispatch(
      sendInquireAction.request({
        name,
        email,
        content,
      })
    );
  }, [name, email, content]);
  return (
    <InquireBlock>
      <InquireForm>
        <CloseButton onClick={onClickClose}>X</CloseButton>
        <Title>문의사항</Title>
        <UserName>
          <input placeholder="이름" onChange={onChangeName} value={name} />
        </UserName>
        <UserEmail>
          <input placeholder="이메일" onChange={onChangeEmail} value={email} />
        </UserEmail>
        <Questions>
          {/* <input placeholder="문의사항을 입력해주세요" /> */}
          <textarea
            placeholder="문의사항을 입력해주세요"
            onChange={onChangeContent}
            value={content}
          />
        </Questions>
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
        <Submit>
          <div onClick={onSubmitInquire}>
            <FcDocument />
            문의하기
          </div>
        </Submit>
      </InquireForm>
    </InquireBlock>
  );
};

export default Inquire;
