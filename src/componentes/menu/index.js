import './styles.css';
import {Link} from 'react-router-dom';


export default function Menu() {
    return (
        <div>
           
            <nav>
                <Link to="/listausuario" className='link'>Usuário </Link>
                <Link to="/listaproduto" className='link'>Produto</Link>
                <Link to="/entradaproduto" className='link'>Entrada</Link>
                <Link to="/listaestoque" className='link'>Estoque</Link>
                <Link to="/listasaida" className='link'>Saida</Link>
            </nav>
        </div>
    )
}