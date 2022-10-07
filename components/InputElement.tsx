import { ChangeEvent, useCallback } from "react";
import { useRecoilState } from "recoil";
import { nameState } from "atoms/name";

function InputElement() {
  const [name, setName] = useRecoilState(nameState);

  const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  return (
    <input
      type="text"
      placeholder="Enter the name"
      onChange={handleChangeInput}
      value={name}
    />
  );
}

export default InputElement;
