/* eslint-disable @typescript-eslint/restrict-template-expressions */
export function shortenAddress (str = '') {
  return `${str.slice(0, 6)}...${str.slice(str.length - 4)}`;
}

export function shorten (str: string, key?: any): string {
  if (!str) return str;
  let limit;
  if (typeof key === 'number') limit = key;
  if (key === 'symbol') limit = 6;
  if (key === 'name') limit = 64;
  if (key === 'choice') limit = 12;
  if (limit) { return str.length > limit ? `${str.slice(0, limit).trim()}...` : str; }
  return shortenAddress(str);
}

export function getURLs (text: string) {
  const urlRegex = /\[([^\[]+)\]\((.*)\)/;
  return text.match(urlRegex) ?? [];
}

export const getUploadedMediaUrl = (media: any) => `https://${
    process.env.PINATA_GATEWAY ?? 'turquoise-changing-crane-15.mypinata.cloud'
  }/ipfs/${media.url.split('ipfs://')[1]}`;
