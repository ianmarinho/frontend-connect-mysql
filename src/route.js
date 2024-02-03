import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Logon from './pages/logon';
import Dashboard from './pages/dashboard';
import Listausuario from './pages/listarUsuario';
import Cadastrousuario from './pages/cadastroUsuario';
import Editarusuario from './pages/editarUsuario';
import Editarproduto from './pages/editarProduto';
import Cadastroproduto from './pages/cadastroProduto';
import Cadentradaproduto from './pages/cadentradaproduto';
import Listaproduto from './pages/listarProduto';
import Entradaproduto from './pages/entradaproduto';

export default function Rotas(){
    return(
       <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Logon/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/listausuario" element={<Listausuario/>} />
                <Route path="/listaproduto" element={<Listaproduto/>} />
                <Route path="/entradaproduto" element={<Entradaproduto/>} />
                <Route path="/cadastrousuario" element={<Cadastrousuario/>} />
                <Route path="/cadastroproduto" element={<Cadastroproduto/>} />
                <Route path="/cadentradaproduto" element={<Cadentradaproduto/>} />
                <Route path="/editarusuario/:id" element={<Editarusuario/>} />
                <Route path="/editarproduto/:id" element={<Editarproduto/>} />
               
                
            </Routes>
       
       </BrowserRouter>

    )
}