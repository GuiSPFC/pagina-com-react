import { useEffect, useState } from "react";
import Tarefa from './components/Tarefas';
import { useInput } from "./hooks/input";
import { useTarefas, TarefasProvider } from "./components/TarefasProvider";

function ListaTarefas(){

    const tarefaInput = useInput();
    const {tarefas, adicionarTarefa, removerTarefa, setFiltro, tarefasFiltradas, filtro, alternarTarefa} = useTarefas();

    const handleSubmit = (e) => {
        e.preventDefault();

        const textoTrim = tarefaInput.valor.trim();
        if (textoTrim === '') return;

        adicionarTarefa(textoTrim).then(() => {
            tarefaInput.limpar();
        });
    };

    return (
        <main style={{ padding: '20px', fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f5f5f5', gap: '20px', display: 'flex',alignItems: 'center', flexDirection: 'column'}}>
            <h1>Minhas Tarefas</h1>

            <form onSubmit={handleSubmit}>
                <input style={{padding: '8px', borderRadius: '4px', border: '1px solid'}}
                placeholder="Digite uma tarefa"
                value={tarefaInput.valor}
                onChange={tarefaInput.onChange}
                />
                <button type="submit" style={{marginLeft: '12px',padding: '10px', background: '#007bff', color: 'white',border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '8px'}}>Adicionar Tarefa</button>
            </form>

            <div style={{margin: '15px 0', display: 'flex', gap: '10px'}}>
                <button onClick={() => setFiltro('todas')}
                style={{fontWeight: filtro === 'todas' ? 'bold' : 'normal', padding: '10px', background: '#ffb700', color: 'black', cursor: 'pointer', fontWeight: 'bold', borderRadius: '8px', border: 'none' }}>
                    Todas
                </button>
                
                <button onClick={() => setFiltro('concluidas')}
                style={{fontWeight: filtro === 'concluidas' ? 'bold' : 'normal', padding: '10px', background: '#1be400', color: 'black', cursor: 'pointer', fontWeight: 'bold', borderRadius: '8px', border: 'none'}}>
                    Concluidas
                </button>

                <button onClick={() => setFiltro('pendentes')}
                style={{fontWeight: filtro === 'pendentes' ? 'bold' : 'normal', padding: '10px', background: '#ff2a00', color: 'black', cursor: 'pointer', fontWeight: 'bold', borderRadius: '8px', border: 'none'}}>
                    Pendentes
                </button>
            </div>

            <ul>
                {tarefasFiltradas.map(t =>(
                    <Tarefa key={t._id}
                    texto={t.texto}
                    concluida={t.concluida}
                    onRemover={() => removerTarefa(t._id)}
                    onAlternar={() => alternarTarefa(t._id)}
                />
                ))}
            </ul>
        </main>
    );
}

export default function AppTarefas() {
    return (
        <TarefasProvider>
            <ListaTarefas />
        </TarefasProvider>
    )
}