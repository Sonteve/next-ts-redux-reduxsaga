import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { searchWordAction } from "../reducers/search";

const SearchBar = () => {
  const [input, setInput] = useState<string>("");
  const dispatch = useDispatch();

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(searchWordAction.request(input));
    },
    [input]
  );
  return (
    <SearchForm onSubmit={onSubmit}>
      <InputWrapper>
        <input
          placeholder="품목을 입력하세요."
          value={input}
          onChange={onChange}
        />
      </InputWrapper>
    </SearchForm>
  );
};

export default SearchBar;

const SearchForm = styled.form`
  padding: 10px;
  background: #dbdbdb;
  border: 1px solid #eaeaea;
`;

const InputWrapper = styled.div`
  display: flex;

  & > input {
    flex: 1;
    padding: 10px;
    font-size: 15px;
    border: 1px solid #eee;
    border-radius: 8px;
  }
`;
