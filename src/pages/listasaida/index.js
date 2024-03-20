import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componentes/Menu';
import { FiTrash } from "react-icons/fi"; // Imported FiTrash for delete button
import { MdCancel } from 'react-icons/md'; // Imported MdCancel for cancel button
import { RiSave3Fill } from 'react-icons/ri'; // Imported RiSave3Fill for save button
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import Head from '../../componentes/Head';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import api from '../../server/api';

export default function Listarsaida() {
    const [banco, setBanco] = useState([]);

    useEffect(() => {
        mostrarDados();
    }, []);

    function formatarData(data) {
        return moment(data).format('DD/MM/YYYY');
    }

    function mostrarDados() {
        // setBanco(JSON.parse(localStorage.getItem("cd-saida") || "[]"));
        
        api.get('/saida')
            .then(res => {
                console.log(res.data.saida)
                setBanco(res.data.saida)
            })
    }

    const apagar = (id) => {
        confirmAlert({
            title: 'Excluir Saida',
            message: 'Deseja realmente excluir essa saida?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {
                        // let dadosnovos = banco.filter(item => item.id !== id);
                        // localStorage.setItem("cd-cadentradaproduto", JSON.stringify(dadosnovos));
                        // setBanco(dadosnovos); // Atualiza o estado com os dados filtrados
                        // alert(`Você apagou a entrada id:${id}`);

                        api.delete(`/saida/${id}`)
                            .then(res => {
                                if (res.status == 200) {
                                    alert(`Você apagou a saida id:${id}`);
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

    // function mostrarnome(idproduto) {
    //     let nome = "";
    //     const Listarproduto = JSON.parse(localStorage.getItem("cd-produtos") || "[]");

    //     Listarproduto
    //         .filter(value => value.id == idproduto)
    //         .map(value => {
    //             nome = value.descricao;
    //         });

    //     return nome;
    // }

    return (
        <div className="dashboard-container">
            <div className='menu'>
                <h1>Menu</h1>
                <Menu />
            </div>
            <div className='principal'>
                <h1>Lista de Saida</h1>
                <Link to="/cadastrosaida" className='btn-novo'>Novo Cadastro</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>produto</th>
                            <th>quantidade</th>
                            <th>valor unitario</th>
                            <th>data saida</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            banco.map((said) => {

                                return (
                                    <tr key={said.toString()}>
                                        <td> {said.id} </td>
                                        <td> {said.descricao} </td>
                                        <td> {said.quantidade} </td>
                                        <td> {said.valor_unitario} </td>
                                        <td>{formatarData(said.data)} </td>
                                        <td className='botoes'> <FiTrash color='red' onClick={(e) => apagar(said.id)} />
                                        </td>

                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
}
