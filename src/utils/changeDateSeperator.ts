export function changeDateSeperator(date: string) {
  return date?.split("-").join(".");
}

const date = new Date();
export const krTime = new Intl.DateTimeFormat("kr").format(date).slice(0, -1);
