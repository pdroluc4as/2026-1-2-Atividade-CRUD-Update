import axios from "axios";
import Produto from "@/app/produtos/page";

const api = axios.create({
  baseURL: process.env.API_URL ? process.env.API_URL : "https://dummyjson.com/", 
  headers: {
    'Content-Type': 'application/json',
  },
});

const getProdutosTodos = () => {
    return api.get("/products/");
}

const editarProduto = async (id:number, dadosAtualizados:Partial<Produto>) => {
    try {
        const resposta = await api.put(`/products/${id}`, dadosAtualizados);
        console.log(resposta.data);
        return resposta.data;
    } catch(erro) {
        console.log(erro);
        throw erro;
    }
}

export { getProdutosTodos };
export { editarProduto };
export default api;