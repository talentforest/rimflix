import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

export const searchState = atom<string>({
  key: `search/${uuidv4}`,
  default: "",
});
