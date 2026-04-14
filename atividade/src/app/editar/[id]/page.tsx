'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { editarProduto } from '@/services/api'; 
import api from '@/services/api'; 
import { title } from 'process';

export default function PaginaEditar(){
    const params = useParams(); // Captura o ID da URL
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const prod = async () => {
            const resultado = await api.get(`/products/${params.id}/`); // sempre utilizar await em chamada de api
            //console.log(resultado.data.title); await para fazer com que o javascript consiga ler a promisse
            
            const newTitle = resultado.data.title;
            setTitle(newTitle);
            const newDescription = resultado.data.description;
            setDescription(newDescription);
            const newPrice = resultado.data.price;
            setPrice(newPrice)

            if (newTitle != ''){
                setCarregando(false);
            }
        }
        prod();
    }, [params.id])

    const Salvar = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
      await editarProduto(Number(params.id), { title:title, price:price, description:description });
      alert("Atualizado!");
      router.push('/'); // Volta para a página principal
    } catch (err) {
      alert("Erro ao salvar");
    }
    }

    if (carregando) return <p>A carregar dados do produto...</p>;
    return (
        <>
            <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-md border border-gray-200">
    {/* Cabeçalho do Formulário */}
    <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Editar Produto</h1>
        <p className="text-gray-500 mt-2">Atualizando dados do produto #{params.id}</p>
    </div>

    <form onSubmit={Salvar} className="flex flex-col gap-6">
        
        {/* Campo: Nome do Produto */}
        <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Nome do Produto
            </label>
            <input
                id="name" 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Ex: Teclado Mecânico"
            />
        </div>

        {/* Campo: Descrição */}
        <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-semibold text-gray-700">
                Descrição do produto
            </label>
            <textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                rows={5}
                className="p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-y"
                placeholder="Detalhes do produto..."
            ></textarea>
        </div>

        {/* Campo: Preço */}
        <div className="flex flex-col gap-2">
            <label htmlFor="price" className="text-sm font-semibold text-gray-700">
                Preço (R$)
            </label>
            <input 
                id="price" 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(Number(e.target.value))} 
                className="p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="0.00"
            />
        </div>
        
        {/* Botão de Salvar */}
        <button 
            type="submit"
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
        >
            Salvar Alterações
        </button>

    </form>
</div>
        </>
    )
}