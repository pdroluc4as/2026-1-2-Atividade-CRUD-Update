'use client';

import { useEffect, useState } from "react";
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
      console.log(resultado.data.products);
      setProdutos(resultado.data.products);
    }
    carregar();
}, [])

  return (
    <div>
      <h1>Listagem de Produtos</h1>
      <ol className="flex flex-wrap">
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
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>{produto.title}</CardTitle>
        <CardDescription>
          {produto.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-around">
        <Button className="w-15">{produto.price}</Button>
        <span>Editar</span>
      </CardFooter>
      
    </Card>
    ); 
}
