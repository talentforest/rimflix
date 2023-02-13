export enum backdropSizes {
  w300 = 'w300',
  w780 = 'w780',
  w1280 = 'w1280',
  original = 'original',
}

export enum posterSizes {
  w92 = 'w92',
  w154 = 'w154',
  w185 = 'w185',
  w342 = 'w342',
  w500 = 'w500',
  w780 = 'w780',
  original = 'original',
}

export enum profileSizes {
  w45 = 'w45',
  w185 = 'w185',
  h632 = 'h632',
  original = 'original',
}

export enum stillSizes {
  w92 = 'w92',
  w185 = 'w185',
  w300 = 'w300',
  original = 'original',
}

const base_url = 'https://image.tmdb.org/t/p';

export function sizeImagePath(file_size: string, file_path: string) {
  return `${base_url}/${file_size}${file_path}`;
}
