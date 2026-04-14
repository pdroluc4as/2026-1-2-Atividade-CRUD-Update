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
            <div className='mx-auto my-0'>
                <h1>Pagina de Editar Produto</h1>
                    <form onSubmit={Salvar}>
                    <h1>Editar Produto #{params.id}</h1><br></br>

                    <div className="flex flex-col">
                        <label for="name">Nome do Produto:</label>
                        <input
                            id='name' 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            className='bg-gray-100'
                        />
                    </div>
                    <br></br>
                    <div className='flex flex-col'>
                        <label for="description">Descrição produto:</label>
                        <textarea id="description" className="border-2"  value={description} onChange={(e) => setDescription(e.target.value)} rows={10}></textarea><br></br>
                    </div>

                    <div>
                        <label for="price">Preço:</label>
                        <input id="price" type='number' value={price} onChange={(e) => setPrice(Number(e.target.value))} className='bg-gray-100'></input><br></br>
                    </div>
                    
                    <button className="mt-3 bd-5 cursor-pointer" type="submit">Salvar Alterações</button>
                </form>
            </div>
        </>
    )
}