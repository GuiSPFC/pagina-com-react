import { createRoot } from 'react-dom/client'
import App from './AppTarefas.jsx'
import { RecoilRoot } from "recoil";

createRoot(document.getElementById('root')).render(
    <RecoilRoot>
        <App />
    </RecoilRoot>
)
