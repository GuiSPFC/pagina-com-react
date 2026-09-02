import { useEffect, useState } from "react";
import ProdutoCard from "./components/components";
import styled from "styled-components";

//Estilos com Syled components
const Main = styled.main`
    padding: 20px;
    font-family: sans-serif;
    min-height: 100vh;
    background-color: #f5f5f5;
    gap: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 600px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 100%;
`;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Botao = styled.button`
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    font-weight: bold;
    border-radius: 8px;

    &:hover {
        background: #198754;
    }
`;

const H2 = styled.h2`
    justify-content: center;
    display: flex;
`;

const P = styled.p`
    text-align: center;
    fontWeight: bold;
    color: #666;
`;

const Div2 = styled.div`
    display: flex;
    gap: '20px';
    flex-wrap: wrap
`;

const Label = styled.label`
    font-weight: 'bold'
`;

const Input = styled.input`
    padding: 8px;
    border-radius: 4px;
    border: 1px solid
`;
const API_URL = 'https://crudcrud.com/api/3d0e0127651f42319481396a91d267e5/produtos'

function ListaProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [novoProduto, setNovosProdutos] = useState ({
        nome: '',
        preco: '',
        descricao: '',
        imagem: ''
    });

    useEffect(()=>{
        setCarregando(true);
        fetch(API_URL)
        .then(res => res.json())
        .then(dados => {setProdutos(dados); setCarregando(false);})
        .catch(error => {console.error("Erro ao buscar produto", error); setCarregando(false);})
    },[])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNovosProdutos({
            ...novoProduto,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (novoProduto.nome.trim() === '' || novoProduto.preco.trim() === '' || novoProduto.descricao.trim() === '') {
            alert('Dados minímos Nome, Preço e Descrição');
            return;
        }

        const nova = {
            nome: novoProduto.nome.trim(),
            preco: Number(novoProduto.preco) || 0,
            descricao: novoProduto.descricao.trim() || 'Sem descricao',
            imagem: novoProduto.imagem.trim() || 'https://placeholder.com'
        };

        fetch(API_URL,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(nova)
        })
        .then(res => res.json())
        .then(produtoCriado => {setProdutos([...produtos, produtoCriado]); setNovosProdutos({nome: '', preco: '', descricao: '', imagem: ''});})
        .catch(error => console.error("Erro ao buscar produto", error));
    };

    return (
        <Main>
            <h1>Adicionar Produto: </h1>

            <Form onSubmit={handleSubmit}>
                <Div>
                    <Label htmlFor="nome">Nome do produto: </Label>
                    <Input type="text" id="nome" name="nome" value={novoProduto.nome} onChange={handleInputChange}/>
                </Div>

                <Div>
                    <Label htmlFor="preco">Preço do produto: </Label>
                    <Input type="number" step= "0.01" id="preco" name="preco" value={novoProduto.preco} onChange={handleInputChange}/>
                </Div>

                <Div>
                    <Label htmlFor="descricao">Descrição do produto: </Label>
                    <Input type="text" id="descricao" name="descricao" value={novoProduto.descricao} onChange={handleInputChange}/>
                </Div>
                
                <Div>
                    <Label htmlFor="imagem">Imagem do produto: </Label>
                    <Input type="url" id="imagem" name="imagem" value={novoProduto.imagem} onChange={handleInputChange}/>
                </Div>

                <Botao type="submit">Cadastrar Produto</Botao>
            </Form>

            <div>
            <H2>Produtos da Loja</H2>

            {carregando ? (
            <P>Carregando...</P>):
            (
            <Div2>
                {produtos.map((item)=>(
                    <ProdutoCard
                    key={item._id}
                    nome={item.nome}
                    preco={item.preco}
                    imagem={item.imagem}
                    descricao={item.descricao}
                    />
                ))}
            </Div2>
            )}
        </div>
        </Main>
    );
}

export default ListaProdutos;