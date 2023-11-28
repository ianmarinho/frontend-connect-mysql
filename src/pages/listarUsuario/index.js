import '../../pages/global.css';
import Menu from '../../componentes/menu'
import { FiEdit, FiTrash, FiDelete, FiFilePlus } from "react-icons/fi";



export default function Listausuario() {


    // jason e apenas o colchete dentro das (chaves array) , suportando variavel e seu valor, assim identificando os itens mais facilmente.

    const dados = [

        { id: 1, nome: "Carlos", email: "carlos@gmail.com", senha: "123" },

        { id: 2, nome: "Felipe", email: "carlos@gmail.com", senha: "321" },

        { id: 3, nome: "Nilson", email: "carlos@gmail.com", senha: "321" },



    ]
    return (
        <div className="dashboard-container">
            <div className='menu'>
                <h1>Menu</h1>
                <Menu />
            </div>
            <div className='principal'>

                <h1>Lista de Usuário</h1>

                <button className='btn-novo'>Novo Cadastro</button>

                <table >
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>

                    </tr>

                    {
                        dados.map((usu) => {
                            return (
                                <tr key={usu.toString()}>
                                    <td> {usu.id} </td>
                                    <td> {usu.nome} </td>
                                    <td> {usu.email} </td>
                                    <td className='botoes'> <FiEdit />
                                    </td>
                                    <td className='botoes'> <FiTrash />
                                    </td>

                                </tr>
                            )
                        })
                    }

                </table>
            </div>

        </div>
    )
}