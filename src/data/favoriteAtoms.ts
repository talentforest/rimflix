import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

export const myFavoriteMovieState = atom<number[]>({
  key: `myFavoriteMovie/${uuidv4()}`,
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const myFavoriteMovieStoreKey = "myFavoriteMovie";
      const savedValue = localStorage.getItem(myFavoriteMovieStoreKey);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(myFavoriteMovieStoreKey)
          : localStorage.setItem(
              myFavoriteMovieStoreKey,
              JSON.stringify(newValue)
            );
      });
    },
  ],
});

export const myFavoriteTvState = atom<number[]>({
  key: `myFavoriteTv/${uuidv4()}`,
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const myFavoriteTvStoreKey = "myFavoriteTv";
      const savedValue = localStorage.getItem(myFavoriteTvStoreKey);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(myFavoriteTvStoreKey)
          : localStorage.setItem(
              myFavoriteTvStoreKey,
              JSON.stringify(newValue)
            );
      });
    },
  ],
});

export const searchState = atom<string>({
  key: `search/${uuidv4}`,
  default: "",
});
