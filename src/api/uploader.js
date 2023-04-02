export async function uploadImage(file) {
  const data = new FormData();
  data.append('file', file);
  // preset키는 따로 env에서 관리!
  data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
  return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
    method: 'post',
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url);
}
