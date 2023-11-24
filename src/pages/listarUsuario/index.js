import '../../pages/global.css';
import Menu from '../../componentes/menu'



export default function Listausuario() {
    return (
        <div className="dashboard-container">
            <div className='menu'>
                <h1>Menu</h1>
            <Menu/>
            </div>
            <div className='principal'>
                <h1>Lista de Usuário</h1>
            </div>

        </div>
    )
}