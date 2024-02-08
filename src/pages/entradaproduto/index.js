
import React, { useState,useEffect } from 'react';

import '../../pages/global.css';
import Menu from '../../componentes/Menu'
import { FiEdit, FiTrash, FiDelete, FiFilePlus } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {json, Link} from 'react-router-dom';
import Head from '../../componentes/Head';
import { useNavigate, link } from 'react-router-dom';



export default function Entradaproduto() {

    const [dados,setDados] = useState([]);
    const [banco,setBanco] = useState([]);
    const navigate = useNavigate ();

    useEffect ( ()=>{
    mostrarDados ();
    },[] )

    function mostrarDados ()
    {
        setBanco(JSON.parse(localStorage.getItem("cd-cadentradaproduto") || "[]"));
    }

    function mostrarnome (idproduto){
    let nome = "";
    const Listaproduto = JSON.parse(localStorage.getItem ("cd-produtos") || "[]" );

    Listaproduto.
    filter ( value => value.id == idproduto).
    map (value => {
    
        nome = value.descricao
    }) 


    return nome;
    }

    const  apagar = (id) => {
        confirmAlert({
          title: 'Excluir Entrada',
          message: 'Deseja realmente excluir essa entrada?',
          buttons: [
            {
              label: 'Sim',
              onClick: () => {
                let dadosnovos = banco.filter(item => item.id !== id);
                localStorage.setItem("cd-cadentradaproduto", JSON.stringify(dadosnovos));
                setBanco(dadosnovos); // Atualiza o estado com os dados filtrados
                alert(`Você apagou a entrada id:${id}`);
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

        <Head title = "Entrada de Produto" />

            <Link to="/cadentradaproduto"  className='btn-novo'>Novo Cadastro</Link>

            <table >
                <tr>
                    <th>Id</th>
                    <th>Id Produto</th>
                    <th>Quantidade</th>
                    <th>Valor Unitário</th>
                    <th>Data de Entrada</th>
                    <th></th>
                    <th></th>

                </tr>
                
                {
                    banco.map((ent) => {

                        return (
                            <tr key={ent.toString()}>
                                <td> {ent.id} </td>
                                <td> { (mostrarnome) (ent.idproduto)} </td>
                                <td> {ent.quantidade} </td>
                                <td> {ent.valorunitario} </td>
                                <td> {ent.dataentrada} </td>
                                <td className='botoes'> <FiTrash color='red' onClick={(e)=>apagar(ent.id)}/>
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