import { createRoot } from 'react-dom/client'
import App from './produtos.jsx'
import { RecoilRoot } from "recoil";

createRoot(document.getElementById('root')).render(
    <RecoilRoot>
        <App />
    </RecoilRoot>
)
