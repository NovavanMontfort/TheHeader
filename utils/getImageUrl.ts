export async function getImageUrl(id: number, width = 1000, height = 800) {
  if (!id) return null;
  try {
    const response = (await useBaseApi('/media/file/' + id + '?width=' + width + '&height=' + height)) as ElocusMediaResponse;
    return response;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getImage(id: number, width = 1000, height = 800) {
  if (!id) return null;
  try {
    const response = (await useBaseApi('/media/file/' + id + '?width=' + width + '&height=' + height)) as ElocusMediaResponse;
    return response;
  } catch (e) {
    console.error(e);
    return null;
  }
}
