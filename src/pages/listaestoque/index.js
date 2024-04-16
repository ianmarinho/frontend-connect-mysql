import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componentes/Menu';
import api from '../../server/api';

export default function ListarEstoque() {
    const [estoque, setEstoque] = useState([]);

    useEffect(() => {
        mostrarDados();
    }, []);

    function mostrarDados() {
        api.get('/estoque')
        .then(res => {
            console.log(res.data.estoque)
            setEstoque(res.data.estoque)
        })
        .catch(error => {
            console.error('Erro ao buscar dados do estoque:', error);
        });
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
                            <th>Valor unitário</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estoque.map((item) => (
                            <tr key={item.id_produto}>
                                <td>{item.id_produto}</td>
                                <td>{item.descricao}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor_unitario}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
