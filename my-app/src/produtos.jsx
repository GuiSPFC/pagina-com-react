import { useEffect, useState } from "react";
import ProdutoCard from "./components/components";

const API_URL = 'https://crudcrud.com/api/7712e274149e4551a0dc3c77bfbae5c7/produtos'

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
        <main style={{ padding: '20px', fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f5f5f5', gap: '20px', display: 'flex',alignItems: 'center', flexDirection: 'column'}}>
            <h1>Adicionar Produto: </h1>

            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <label htmlFor="nome" style={{fontWeight: 'bold'}}>Nome do produto: </label>
                    <input type="text" id="nome" name="nome" value={novoProduto.nome} onChange={handleInputChange} style={{padding: '8px', borderRadius: '4px', border: '1px solid'}}/>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <label htmlFor="preco" style={{fontWeight: 'bold'}}>Preço do produto: </label>
                    <input type="number" step= "0.01" id="preco" name="preco" value={novoProduto.preco} onChange={handleInputChange} style={{padding: '8px', borderRadius: '4px', border: '1px solid'}}/>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <label htmlFor="descricao" style={{fontWeight: 'bold'}}>Descrição do produto: </label>
                    <input type="text" id="descricao" name="descricao" value={novoProduto.descricao} onChange={handleInputChange} style={{padding: '8px', borderRadius: '4px', border: '1px solid'}}/>
                </div>
                
                <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <label htmlFor="imagem" style={{fontWeight: 'bold'}}>Imagem do produto: </label>
                    <input type="url" id="imagem" name="imagem" value={novoProduto.imagem} onChange={handleInputChange} style={{padding: '8px', borderRadius: '4px', border: '1px solid'}}/>
                </div>

                <button type="submit" style={{padding: '10px', background: '#007bff', color: 'white',border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '8px'}}>Cadastrar Produto</button>
            </form>

            <div>
            <h2 style={{justifyContent: 'center', display: 'flex'}}>Produtos da Loja</h2>

            {carregando ? (
            <p style={{textAlign: 'center', fontWeight: 'bold', color: '#666'}}>Carregando...</p>):
            (
            <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
                {produtos.map((item)=>(
                    <ProdutoCard
                    key={item._id}
                    nome={item.nome}
                    preco={item.preco}
                    imagem={item.imagem}
                    descricao={item.descricao}
                    />
                ))}
            </div>
            )}
        </div>
        </main>
    );
}

export default ListaProdutos;