import { useState, useEffect } from "react";

const API_URL = 'https://crudcrud.com/api/246026e837df4e43a890cc9ff81eb27f/tarefas';

export function useTarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [filtro, setFiltro] = useState ('todas');

    useEffect(() => {
        fetch(API_URL)
        .then(res => res.json())
        .then(dados => setTarefas(dados))
        .catch(error => console.error("Erro ao buscar tarefas:", error));
    }, []);

    const adicionarTarefa = (texto) => {
        const nova = { texto, concluida: false };

        return fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(nova)
        })
        .then(res => res.json())
        .then(tarefaCriada => {
            setTarefas(listaAnterior => [...listaAnterior, tarefaCriada]);
        })
        .catch(error => console.error("Erro ao adicionar tarefa:", error));
    };

    const removerTarefa = (id) => {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                setTarefas(listaAnterior => listaAnterior.filter(t => t._id !== id));
            } else {
                console.error("Erro ao deletar tarefa no servidor");
            }
        })
        .catch(error => console.error("Erro ao deletar tarefa:", error));
    };

    const alternarTarefa = (id) => {
        const tarefaAtual = tarefas.find(t => t._id === id);
        if(!tarefaAtual) return;

        const tarefaAtualizada = {
            texto: tarefaAtual.texto,
            concluida: !tarefaAtual.concluida
        };

        fetch(`${API_URL}/${id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tarefaAtualizada)
        })
        .then(res => {
            if (res.ok) {
                setTarefas(listaAnterior => listaAnterior.map(t=> t._id === id ? {...t, concluida: !t.concluida}: t));  
            } else {
                console.error("erro ao atualizar tarefa");
            }
        })
        .catch(error => console.error("Erro ao atualizar a tarefa:", error));
    }

    const tarefasFiltradas = tarefas.filter(t => {
        if (filtro === 'pendentes') return !t.concluida;
        if (filtro === 'concluidas') return t.concluida;
        return true;
    })

    return {
        tarefas,
        adicionarTarefa,
        removerTarefa,
        tarefasFiltradas,
        setFiltro,
        alternarTarefa
    };
}
