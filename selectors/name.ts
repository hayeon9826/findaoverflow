import { selector } from "recoil";
import { nameState } from "../atoms/name";

export const lengthState = selector({
  key: "lengthState",
  get: ({ get }) => {
    const name = get(nameState);
    const lengthOfName = name.length;
    return lengthOfName;
  },
});
