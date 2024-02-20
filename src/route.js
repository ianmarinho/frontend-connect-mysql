import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Logon from './pages/logon';
import Dashboard from './pages/dashboard';
import Listarusuario from './pages/listarUsuario';
import Cadastrousuario from './pages/cadastroUsuario';
import Editarusuario from './pages/editarUsuario';
import Editarproduto from './pages/editarProduto';
import Cadastroproduto from './pages/cadastroProduto';
import Cadentradaproduto from './pages/cadentradaproduto';
import Cadastrosaida from './pages/cadastrosaida';
import Listaproduto from './pages/listarProduto';
import Entradaproduto from './pages/entradaproduto';
import Listarestoque from './pages/listaestoque';
import Listarsaida from './pages/listasaida';

export default function Rotas(){
    return(
       <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Logon/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/listausuario" element={<Listarusuario/>} />
                <Route path="/listaproduto" element={<Listaproduto/>} />
                <Route path="/entradaproduto" element={<Entradaproduto/>} />
                <Route path="/cadastrousuario" element={<Cadastrousuario/>} />
                <Route path="/cadastroproduto" element={<Cadastroproduto/>} />
                <Route path="/cadastrosaida" element={<Cadastrosaida/>} />
                <Route path="/cadentradaproduto" element={<Cadentradaproduto/>} />
                <Route path="/editarusuario/:id" element={<Editarusuario/>} />
                <Route path="/editarproduto/:id" element={<Editarproduto/>} />
                <Route path="/listaestoque/" element={<Listarestoque/>} />
                <Route path="/listasaida/" element={<Listarsaida/>} />

               
                
            </Routes>
       
       </BrowserRouter>

    )
}