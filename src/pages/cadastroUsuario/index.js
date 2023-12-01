import '../../pages/global.css';
import Menu from '../../componentes/menu'
import { FiFilePlus } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Head from '../../componentes/menu/Head';




export default function Cadastrousuario() {


    return (
        <div className="dashboard-container">



            <div className='menu'>
                <h1>Menu</h1>
                <Menu />
            </div>

            <div className='principal'>

                <Head title="Cadastro de Usuário" />

             

                <form>
                    <input type="text" placeholder="Digite o nome de usuário" />
                    <input type="email" placeholder="Digite o email" />
                    <input type="password" placeholder="Digite a senha" />
                    <button>Salvar</button>
                    <button>Cancelar</button>
                </form>

            </div>
        </div>
    )
}