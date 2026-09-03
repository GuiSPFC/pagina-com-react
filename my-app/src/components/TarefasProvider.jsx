import { createContext, useContext, useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tarefasState } from '../state/listaTarefas';
import { filtroState, tarefasFiltradasState } from '../state/filtroTarefas';

const TarefasContext = createContext();
const API_URL = 'https://crudcrud.com/api/2ee1a41e70b74234ba74c297783112b1/tarefas';

export function TarefasProvider({ children }) {
  const [tarefas, setTarefas] = useRecoilState(tarefasState);
  const [filtro, setFiltro] = useRecoilState(filtroState);
  const tarefasFiltradas = useRecoilValue(tarefasFiltradasState);

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
      headers: { 'Content-Type': 'application/json' },
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
    if (!tarefaAtual) return;

    const tarefaAtualizada = {
      texto: tarefaAtual.texto,
      concluida: !tarefaAtual.concluida
    };

    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarefaAtualizada)
    })
      .then(res => {
        if (res.ok) {
          setTarefas(listaAnterior =>
            listaAnterior.map(t => t._id === id ? { ...t, concluida: !t.concluida } : t)
          );
        } else {
          console.error("Erro ao atualizar tarefa");
        }
      })
      .catch(error => console.error("Erro ao atualizar a tarefa:", error));
  };

  return (
    <TarefasContext.Provider value={{
      tarefas,
      filtro,
      setFiltro,
      tarefasFiltradas,
      adicionarTarefa,
      removerTarefa,
      alternarTarefa
    }}>
      {children}
    </TarefasContext.Provider>
  );
}

export function useTarefas() {
  const context = useContext(TarefasContext);
  return context;
}