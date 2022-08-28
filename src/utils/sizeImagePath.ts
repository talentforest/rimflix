const base_url = "https://image.tmdb.org/t/p";

export function sizeImagePath(size: string, file_path: string) {
  return `${base_url}/${size}${file_path}`;
}
