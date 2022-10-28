import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { Language } from "../api/api";

export const languageState = atom({
  key: `language/${uuidv4()}`,
  default: Language.ko || Language.en,
});
