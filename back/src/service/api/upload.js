import axios from '../request'

export default async (file) => {
  const formData = new FormData();
  formData.append('file', file, file.name)
  const res = await axios.post('/upload',formData)
  return res;
}
