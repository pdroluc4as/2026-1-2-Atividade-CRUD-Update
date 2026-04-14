'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { getProdutosTodos } from "@/services/api"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ProdutoType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
}

export default function Home() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);

  useEffect(() => {
    const carregar = async() => {
      const resultado = await getProdutosTodos();
      // console.log(resultado.data.products);
      setProdutos(resultado.data.products);
    }
    carregar();
}, [])

  return (
    <div>
      <h1>Listagem de Produtos</h1>
      <ol className="flex flex-wrap gap-5">
        {produtos.map(p => (
          <CardProduto key={p.id} produto={p} />
        ))}
      </ol>
    </div>
  );
}

interface CardProdutoProp {
  produto:ProdutoType
}

function CardProduto({produto}:CardProdutoProp) {
  const router = useRouter();

  const irParaEditar = () => {
    // Redireciona para /editar/ID_DO_PRODUTO
    router.push(`/editar/${produto.id}`);
  };

    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={produto.thumbnail}
        alt="Foto Produto"
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardAction>
          <Badge className="bg-green-400" variant="secondary">Em Estoque</Badge>
        </CardAction>
        <CardTitle>{produto.title}</CardTitle>
        <CardDescription>
          {produto.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-around">
        <Button className="w-15">${produto.price}</Button>
        <button className="w-15 cursor-pointer" onClick={irParaEditar}>Editar</button>
      </CardFooter>
      
    </Card>
    ); 
}
