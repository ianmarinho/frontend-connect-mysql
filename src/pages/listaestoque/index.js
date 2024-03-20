import React, { useState, useEffect } from 'react';
import { RiSave3Fill } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import '../../pages/global.css';
import Menu from '../../componentes/Menu';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import Head from '../../componentes/Head';
import api from '../../server/api';

export default function Listarestoque() {
    const [banco, setBanco] = useState([]);

    useEffect(() => {
        mostrardados();
    }, []);

    function mostrardados() {
        // const dadosLocalStorage = JSON.parse(localStorage.getItem("cd-estoques")) || [];
        // setBanco(dadosLocalStorage);

        api.get('/estoque')
        .then(res => {
            console.log(res.data.estoque)
            setBanco(res.data.estoque)
        })
       
    }
    
    function mostrarnome(idproduto) {
        let nome = "";
        const Listarproduto = JSON.parse(localStorage.getItem("cd-produtos") || "[]");

        Listarproduto.
            filter(value => value.id == idproduto).
            map(value => {


                nome = value.descricao;


            })
        return nome;
    }

    return (
        <div className="dashboard-container">
            
            <div className='menu'>
                <h1>Menu</h1>
                <Menu />
            </div>

            <div className='principal'>
                <h1>Lista de Estoque</h1>
               
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Valor unitario</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {
                       
                        banco.map((estoque) => (
                            <tr key={estoque.id}>
                               <td> {estoque.id} </td>
                                    <td> {estoque.descricao} </td>
                                    <td> {estoque.quantidade} </td>
                                    <td> {estoque.valor_unitario} </td>
                                
                            </tr>
                        ))
                        }
                    


                    </tbody>
                </table>
            </div>
        </div>
    )
}