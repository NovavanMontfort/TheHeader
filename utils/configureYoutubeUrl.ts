export function configureYoutubeUrl(url: string, tijdTotInSeconden: number, tijdVanInSeconden: number, autoplay = false) {
  let youtubeParams = '?mute=1';
  if (autoplay) youtubeParams += '&autoplay=1';
  if (tijdVanInSeconden) youtubeParams += `&start=${tijdVanInSeconden}`;
  if (tijdTotInSeconden) youtubeParams += `&end=${tijdTotInSeconden}`;
  return url.replace('/watch?v=', '/embed/') + youtubeParams;
}
