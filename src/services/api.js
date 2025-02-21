import axios from "axios";

const API_URL = "https://sonil-dev.void.co.mz/api/v4";  
const api = axios.create({
  baseURL: API_URL,
});

//- Authorization token 
api.interceptors.request.use((config) => {
  const token = "854ec6f7466af4eef537a5bf16cc291d4eebfc3a969c62cfbe16871c8b296b3a4ca8e1c7943ad077f6b5cdad4c249aa794391fd04be2d4ff56e25a3baf53c01d90dce1b6c337adb45893dee418665366f543cc7bbe70b91b12596aea2be6553576c97676f48a78cba414058c1f608e3793fce50eb5f593f8f781411b55003fc03b704d4ba7eb2a05a1cb909d024100e7174af9cbfec3ddd648a6b5eb09b58979c4513ac3dfbeb6916fe3893aaaa84c6596e0ee42a249bb5421984c5315f178220fdc3a674868578acbf245ffff4b2c4a6eb824b8c3de418a1065bf543d0c10bf6fbf54e17279735d5d2772dfa16dd6ad9a0235157dfad6949be098edaa8c6745fae18fabf824158b97c494e713c64f70611941c0c0cd210c246040331ea6bf26596d3b02f61be3e76a8ad9fcf8c41b86f56d4cd0a76e38ec";
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
