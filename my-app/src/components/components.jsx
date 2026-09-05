import React from 'react';
import styled from 'styled-components';

const Botao = styled.button`
    width: 100%;
    padding: 10px;
    background: ${props => props.$adicionado ? '#198754' : '#6c757d'};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
`;

const Div = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 220px;
    overflow: hidden;
    font-family: sans-serif;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const Imagem = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
`;

const H3 = styled.h3`
    margin: 0 0 5px 0;
    font-size: 18px;
    color: #333;
`;

function ProdutoCard({ nome, preco, imagem, descricao, adicionado = false, onAdicionar }) {

    const precoNumero = Number(preco) || 0;
    
    return (
        <Div>
            <Imagem src={imagem} alt={nome}/>

            <div style={{ padding: '15px' }}>
                <H3>{nome}</H3>
                <p style={{ color: '#666', fontSize: '14px', margin: '0 0 10px 0', minHeight: '40px' }}>{descricao}</p>
                <p style={{ fontWeight: 'bold', color: '#2ecc71', fontSize: '20px', margin: '0 0 15px 0' }}>R$ {precoNumero.toFixed(2)}</p>
                <Botao $adicionado = {adicionado} onClick={onAdicionar}>
                    {adicionado ? 'Adicionado' : 'Adicionar ao carrinho'}
                </Botao>
            </div>
        </Div>
    );
}

export default ProdutoCard;
