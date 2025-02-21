import axios from "axios";

const API_URL = "https://sonil-dev.void.co.mz/api/v4";  
const api = axios.create({
  baseURL: API_URL,
});

//- Authorization token 
api.interceptors.request.use((config) => {
  const token = "305036d035df66b7b8906f0083355bac380c6846182bdb387edffbe8a88695a92db5c90a681b1c6b5424b8dda687e8dd840eecc0115fa7acb28fde07706a738ae0a648cd448f2c9f0de7073ecb7d79a34241b3d993067fd7b70d2e56e14998cce2fbb305653c808d44d9e2a81cd205c5d8afab63ae6e99ba3ff76138817ce5fc55545fd18daca9a6c9723985d511a69e02f050db7acfa8c951367aabe144d1e5c830937a3df9ca9efcfc10c56857fd52fa16425fefcd34ce7d2fc0ed1452cdd559403440cc7e577379489e894c5b4aaca67bc5aa5ebea2659d728d88470f3e229a7f0aba75faaba0b337f58982951885f6d9cdabb1da67c1ace42ef56a2d45ba2aa6234a370cfb1d7029b2b33aae70e5123d57a9c01708298516b22cc3a425765f9b9e0e3c2a8569bca9c0b1796e217e191edfb28fc8564a";
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
