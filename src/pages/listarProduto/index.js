
import React, { useState,useEffect } from 'react';

import '../../pages/global.css';
import Menu from '../../componentes/Menu'
import { FiEdit, FiTrash, FiDelete, FiFilePlus } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {Link} from 'react-router-dom';
import Head from '../../componentes/Head';
import { useNavigate, link } from 'react-router-dom';





export default function Listaproduto() {

    const [dados,setDados] = useState([]);
    const [banco,setBanco] = useState([]);
    const navigate = useNavigate ();

    // jason e apenas o colchete dentro das (chaves array) , suportando variavel e seu valor, assim identificando os itens mais facilmente.

    // const dados = [

    //     { id: 1, nome: "Carlos", email: "carlos@gmail.com", senha: "123" },

    //     { id: 2, nome: "Felipe", email: "carlos@gmail.com", senha: "321" },

    //     { id: 3, nome: "Nilson", email: "carlos@gmail.com", senha: "321" },



    // ]

    useEffect ( ()=>{
    mostrarDados ();
    },[] )

    function mostrarDados ()
    {
        setBanco(JSON.parse(localStorage.getItem("cd-produtos") || "[]"));
    }

    const  apagar = (id) => {
        confirmAlert({
          title: 'Excluir Produto',
          message: 'Deseja realmente excluir esse produto?',
          buttons: [
            {
              label: 'Sim',
              onClick: () => {
                let dadosnovos = banco.filter(item => item.id !== id);
                localStorage.setItem("cd-produtos", JSON.stringify(dadosnovos));
                setBanco(dadosnovos); // Atualiza o estado com os dados filtrados
                alert(`Você apagou o produto id:${id}`);
              }
              
            },
            {
              label: 'Não',
              onClick: () => alert('Click No')
            }
          ]
        });
      };

return (
    <div className="dashboard-container">

       

        <div className='menu'>
            <h1>Menu</h1>
            <Menu />
        </div>

        <div className='principal'>

        <Head title = "Lista de Produto" />

            <Link to="/cadastroproduto"  className='btn-novo'>Novo Cadastro</Link>

            <table >
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Descrição</th>
                    <th>Estoque Minimo</th>
                    <th>Estoque Máximo</th>
                    <th></th>
                    <th></th>

                </tr>

                {
                    banco.map((pro) => {

                        return (
                            <tr key={pro.toString()}>
                                <td> {pro.id} </td>
                                <td> {pro.status} </td>
                                <td> {pro.descricao} </td>
                                <td> {pro.estoque_minimo} </td>
                                <td> {pro.estoque_maximo} </td>
                                <td className='botoes'> 
                                <Link to = {`/editarproduto/${pro.id}`} ><FiEdit color='blue' />
                                </Link> 
                                </td>
                                <td className='botoes'> <FiTrash color='red' onClick={(e)=>apagar(pro.id)}/>
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