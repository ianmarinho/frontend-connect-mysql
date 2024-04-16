import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componentes/Menu';
import { FiTrash } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import Head from '../../componentes/Head';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import api from '../../server/api';

export default function Saidaproduto() {
    const [banco, setBanco] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        mostrarDados();
    }, []);

    function formatarData(data) {
        return moment(data).format('DD/MM/YYYY');
    }

    function mostrarDados() {
        api.get('/saida')
            .then(res => {
                setBanco(res.data.saida);
            })
            .catch(error => {
                console.error("Erro ao obter dados de saída:", error);
            });
    }

    const apagar = (id) => {
        confirmAlert({
            title: 'Excluir Saída',
            message: 'Deseja realmente excluir essa saída?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {
                        api.delete(`/saida/${id}`)
                            .then(res => {
                                if (res.status === 200) {
                                    alert(`Você apagou a saída id:${id}`);
                                    mostrarDados();
                                } else {
                                    alert("Houve um problema no servidor");
                                }
                            })
                            .catch(error => {
                                console.error("Erro ao excluir saída:", error);
                            });
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
                <Head title="Saída de Produto" />
                <Link to="/cadastrosaida" className='btn-novo'>Novo Cadastro</Link>

                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Valor Unitário</th>
                            <th>Data Saída</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {banco.map((saida) => (
                            <tr key={saida.id_}>
                                <td>{saida.id_}</td>
                                <td>{saida.descricao}</td>
                                <td>{saida.quantidade}</td>
                                <td>{saida.valor_unitario}</td>
                                <td>{formatarData(saida.data_saida)}</td>
                                <td className='botoes'><FiTrash color='red' onClick={() => apagar(saida.id_)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
