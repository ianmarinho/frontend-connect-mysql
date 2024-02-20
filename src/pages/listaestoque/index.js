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

export default function Listarestoque() {
    const [banco, setBanco] = useState([]);

    useEffect(() => {
        mostrardados();
    }, []);

    function mostrardados() {
        const dadosLocalStorage = JSON.parse(localStorage.getItem("cd-estoques")) || [];
        setBanco(dadosLocalStorage);
       
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
                       
                        banco.map((usu) => (
                            <tr key={usu.id}>
                                <td>{usu.id}</td>
                                <td>{(mostrarnome)(usu.idproduto)}</td>
                                <td>{usu.quantidade}</td>
                                <td>{usu.valorunitario}</td>
                                
                            </tr>
                        ))
                        }
                    


                    </tbody>
                </table>
            </div>
        </div>
    )
}