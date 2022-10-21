import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

export const myListMovieState = atom<number[]>({
  key: `myListMovie/${uuidv4()}`,
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const myListMovieStoreKey = "myListMovie";
      const savedValue = localStorage.getItem(myListMovieStoreKey);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(myListMovieStoreKey)
          : localStorage.setItem(myListMovieStoreKey, JSON.stringify(newValue));
      });
    },
  ],
});

export const myListTvState = atom<number[]>({
  key: `myListTv/${uuidv4()}`,
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const myListTvStoreKey = "myListTv";
      const savedValue = localStorage.getItem(myListTvStoreKey);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(myListTvStoreKey)
          : localStorage.setItem(myListTvStoreKey, JSON.stringify(newValue));
      });
    },
  ],
});
