import { useCallback, useState, ChangeEvent } from "react";

const useInput = (initialValue = "") => {
  const [input, setInput] = useState<string>(initialValue);
  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  return { input, setInput, onChangeInput };
};

export default useInput;
