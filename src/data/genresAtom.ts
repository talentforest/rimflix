import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { IGenres } from "../api/api";

export const movieGenresState = atom<IGenres[]>({
  key: `movieGenres/${uuidv4()}`,
  default: [],
});

export const tvGenresState = atom<IGenres[]>({
  key: `tvGenres/${uuidv4()}`,
  default: [],
});
