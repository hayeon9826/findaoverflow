import React from "react";
import { useRecoilValue } from "recoil";
import { lengthState } from "selectors/name";

function NameLengthElement() {
  const length = useRecoilValue(lengthState);

  return <h3>{length}</h3>;
}

export default NameLengthElement;
