import { atom } from "recoil";

export const myFavoriteMovieState = atom({
  key: "myFavoriteMovie",
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

export const myFavoriteTvState = atom({
  key: "myFavoriteTv",
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
