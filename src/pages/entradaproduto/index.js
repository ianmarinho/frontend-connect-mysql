
import React, { useState, useEffect } from 'react';

import '../../pages/global.css';
import Menu from '../../componentes/Menu'
import { FiEdit, FiTrash, FiDelete, FiFilePlus } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { json, Link } from 'react-router-dom';
import Head from '../../componentes/Head';
import { useNavigate, link } from 'react-router-dom';
import moment from 'moment';
import api from '../../server/api';



export default function Entradaproduto() {

    const [dados, setDados] = useState([]);
    const [banco, setBanco] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        mostrarDados();
    }, [])

    function formatarData(data) {
        return moment(data).format('DD/MM/YYYY');
    }

    function mostrarDados() {
        // setBanco(JSON.parse(localStorage.getItem("cd-entradas") || "[]"));

        api.get('/entrada')
            .then(res => {
                console.log(res.data.entrada)
                setBanco(res.data.entrada)
            })
    }

    // function mostrarnome(idproduto) {
    //     let nome = "";
    //     const Listaproduto = JSON.parse(localStorage.getItem("cd-produtos") || "[]");

    //     Listaproduto.
    //         filter(value => value.id == idproduto).
    //         map(value => {

    //             nome = value.descricao
    //         })


    //     return nome;
    // }

    const apagar = (id) => {
        confirmAlert({
            title: 'Excluir Entrada',
            message: 'Deseja realmente excluir essa entrada?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {
                        // let dadosnovos = banco.filter(item => item.id !== id);
                        // localStorage.setItem("cd-cadentradaproduto", JSON.stringify(dadosnovos));
                        // setBanco(dadosnovos); // Atualiza o estado com os dados filtrados
                        // alert(`Você apagou a entrada id:${id}`);

                        api.delete(`/entrada/${id}`)
                            .then(res => {
                                if (res.status == 200) {
                                    alert(`Você apagou a entrada id:${id}`);
                                    mostrarDados();
                                } else {
                                    alert("houve um problema no servidor")
                                }
                            })
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

                <Head title="Entrada de Produto" />

                <Link to="/cadentradaproduto" className='btn-novo'>Novo Cadastro</Link>

                <table >
                    <tr>
                        <th>Id</th>
                        <th>produto</th>
                        <th>quantidade</th>
                        <th>valor unitario</th>
                        <th>data saida</th>
                        <th></th>
                        <th></th>

                    </tr>

                    {
                        banco.map((ent) => {

                            return (
                                <tr key={ent.toString()}>
                                    <td> {ent.id} </td>
                                    <td> {ent.descricao} </td>
                                    <td> {ent.quantidade} </td>
                                    <td> {ent.valor_unitario} </td>
                                    <td>{formatarData(ent.data)} </td>
                                    <td className='botoes'> <FiTrash color='red' onClick={(e) => apagar(ent.id)} />
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