import React from 'react';

function ProdutoCard({ nome, preco, imagem, descricao }) {

    const precoNumero = Number(preco) || 0;
    
    return (
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', width: '220px', overflow: 'hidden', fontFamily: 'sans-serif', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <img src={imagem} alt={nome} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />

            <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#333' }}>{nome}</h3>
                <p style={{ color: '#666', fontSize: '14px', margin: '0 0 10px 0', minHeight: '40px' }}>{descricao}</p>
                <p style={{ fontWeight: 'bold', color: '#2ecc71', fontSize: '20px', margin: '0 0 15px 0' }}>R$ {precoNumero.toFixed(2)}</p>
                <button style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Adicionar ao carrinho
                </button>
            </div>
        </div>
    );
}

export default ProdutoCard;
