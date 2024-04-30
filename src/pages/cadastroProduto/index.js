import React, { useState } from 'react';
import '../../pages/global.css';
import Menu from '../../componentes/Menu';
import { RiSave3Fill } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Head from '../../componentes/Head';
import api from '../../server/api';

export default function Cadastroproduto() {
    const navigate = useNavigate();
    const [status, setStatus] = useState("");
    const [descricao, setDescricao] = useState("");
    const [estoque_minimo, setEstoque_minimo] = useState(0);
    const [estoque_maximo, setEstoque_maximo] = useState(10);
    const [opcao, setOpcao] = useState('');

    function salvardados(e) {
        e.preventDefault();

        const produto = {
            id: Date.now().toString(10) + Math.floor(Math.random() * 100 + 50).toString(4),
            status,
            descricao,
            estoque_minimo,
            estoque_maximo
        };

        console.log(produto);

        let i = 0;
        if (status === "")
            i++;
        else if (descricao === "")
            i++;
        else if (estoque_minimo === "" || estoque_minimo === 0)
            i++;
        else if (estoque_maximo === "" || estoque_maximo === 0)
            i++;

        if (i === 0) {
            api.post('/produto', produto, { headers: { "Content-Type": "application/json" } })
                .then(function (response) {
                    console.log(response.data)
                    alert(response.data.mensagem);
                });

            navigate('/listaproduto');
        }
    }

    return (
        <div className="dashboard-container">
            <div className='menu'>
                <h1>Menu</h1>
                <Menu />
            </div>
            <div className='principal'>
                <Head title="Cadastro de Produto" />
                <div className="form-container">
                    <form className='form-cadastro' onSubmit={salvardados}>
                        <input type="text" value={status} onChange={e => setStatus(e.target.value)} placeholder="Digite o status" />
                        <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Digite a descrição" />
                        <input type="number" value={estoque_minimo} onChange={e => setEstoque_minimo(e.target.value)} />
                        <input type="number" value={estoque_maximo} onChange={e => setEstoque_maximo(e.target.value)} />
                        <div className="acao">
                            <button className='btn-save' type="submit"> Salvar <RiSave3Fill /> </button>
                            <button className='btn-cancel' onClick={() => navigate('/listaproduto')}> Cancelar <MdOutlineCancel /> </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
