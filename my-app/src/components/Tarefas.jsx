import { memo, useState } from "react";

function Tarefa({texto, onRemover, onAlternar, concluida}){

    return(
        <li style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px',borderBottom: '1px solid #000000' }}>
            <input type="checkbox"
            checked = {concluida || false}
            onChange={onAlternar}
            />

            <span className={concluida ? 'concluida' : ''} style={{padding: '13px'}}>{texto}</span>
            <button onClick={onRemover} style={{padding: '7px', background: '#fa4949', color: 'white',border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '8px', alignItems: 'center', display: 'flex'}}>Remover</button>
        </li>
    )
}

export default memo(Tarefa);