import {atom, selector} from "recoil";
import { tarefasState } from "./listaTarefas";

export const filtroState = atom({
    key: "filtroState",
    default: "todas",
});

export const tarefasFiltradasState = selector({
    key: "tarefasFiltradasState",
    get: ({get})=>{
        const lista = get(tarefasState);
        const filtro = get(filtroState);
        const listagem = Array.isArray(lista) ? lista : [];

        switch(filtro){
            case "concluidas":
                return listagem.filter((t)=> t.concluida);
            case "pendentes":
                return listagem.filter((t)=> !t.concluida);
            default:
                return listagem;
        }
    },
});