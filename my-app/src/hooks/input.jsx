import { useState } from "react"

export function useInput(valorInicial = ""){

    const [valor, setValor] = useState(valorInicial);
    const onChange = (e) => {
        setValor(e.target.value?.trim());
    }

    const limpar = () => setValor ("");

    return{
        valor,
        onChange,
        limpar
    };
}