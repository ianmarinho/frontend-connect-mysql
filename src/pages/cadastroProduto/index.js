import React, { useState } from 'react';

import '../../pages/global.css';
import Menu from '../../componentes/menu'
import { FiFilePlus } from "react-icons/fi";
import { RiSave3Fill } from "react-icons/ri";
import { MdOutlineCancel, MdPadding } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Head from '../../componentes/menu/Head';

export default function Cadastroproduto() {

    const navigate = useNavigate();
    const [status, setStatus] = useState("");
    const [descricao, setDescricao] = useState("");
    const [quantidade, setQuantidade] = useState("");
    // const usuarios = ["carlos","carlos@gamil.com","123"]

    const produto = {
        id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
        status,
        descricao,
        estoque
    }

    function salvardados(e) {
        e.preventDefault();
        console.log(produto);

        if (status == "")
            alert("Preencha o campo nome")

        else if (descricao == "")
            alert("Preencha o campo email")

        else if (estoque == "")
            alert("Preencha o campo senha")

        else {
            const banco = JSON.parse(localStorage.getItem("cd-produtos") || "[]");
            banco.push(produto)
            localStorage.setItem("cd-produtos", JSON.stringify(banco));
            alert("Usuário salvo com sucesso");
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

                <div class="form-container">

                    <form className='form-cadastro' onSubmit={salvardados}>
                        <input type="produto" value={status} onChange={e => setStatus(e.target.value)} placeholder="Digite o nome do produto" />
                        <input type="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição do produto" />
                        <input type="quantidade" value={quantidade} onChange={e => setQuantidade(e.target.value)} placeholder="Digite a quantidade" />

                        <div class="acao">
                            <button className='btn-save'> Salvar <RiSave3Fill /> </button>
                            <button className='btn-cancel'> Cancelar <MdOutlineCancel /> </button>
                        </div>

                    </form>

                </div>


            </div>
        </div>
    )
}