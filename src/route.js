import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Logon from './pages/logon';
import Dashboard from './pages/dashboard';
import Listausuario from './pages/listarUsuario';
import Cadastrousuario from './pages/cadastroUsuario';
import Editarusuario from './pages/editarUsuario';
import Editarproduto from './pages/editarProduto';
import Cadastroproduto from './pages/cadastroProduto';
import Listaproduto from './pages/listarProduto';

export default function Rotas(){
    return(
       <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Logon/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/listausuario" element={<Listausuario/>} />
                <Route path="/listaproduto" element={<Listaproduto/>} />
                <Route path="/cadastrousuario" element={<Cadastrousuario/>} />
                <Route path="/cadastroproduto" element={<Cadastroproduto/>} />
                <Route path="/editarusuario/:id" element={<Editarusuario/>} />
                <Route path="/editarproduto/:id" element={<Editarproduto/>} />
               
                
            </Routes>
       
       </BrowserRouter>

    )
}