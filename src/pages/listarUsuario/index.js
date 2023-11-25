import '../../pages/global.css';
import Menu from '../../componentes/menu'



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
                <Menu />
            </div>
            <div className='principal'>

                <h1>Lista de Usuário</h1>

                <table border={1}>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>.

                        <th>Email</th>
                        <th></th>
                    </tr>

                    {
                        dados.map((usu)=>{
                        return(
                        <tr key={usu.toString()}>
                            <td> {usu.id} </td>
                            <td> {usu.nome} </td>
                            <td> {usu.email} </td>

                        </tr>
                        )
                        })
                    }

                </table>
            </div>

        </div>
    )
}