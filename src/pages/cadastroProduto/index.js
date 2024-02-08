import React, { useState } from 'react';

import '../../pages/global.css';
import Menu from '../../componentes/Menu';
import { RiSave3Fill } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Head from '../../componentes/Head';

export default function Cadastroproduto() {

    const navigate = useNavigate();
    const [status, setStatus] = useState("");
    const [descricao, setDescricao] = useState("");
    const [estoque_minimo, setEstoque_minimo] = useState(0);
    const [estoque_maximo, setEstoque_maximo] = useState(10);
    // const usuarios = ["carlos","carlos@gamil.com","123"]

    const produto = {
        id: Date.now().toString(10) + Math.floor(Math.random() * 100 + 50).toString(4),
        status,
        descricao,
        estoque_minimo,
        estoque_maximo
    }

    function salvardados(e) {
        e.preventDefault();
        let i = 0;
        if (status === "")
            i++;
        else if (descricao === "")
            i++;
        else if (estoque_minimo === "" || estoque_minimo === 0)
            i++;
        else if (estoque_maximo === "" || estoque_maximo === 0)
            i++;
        if (i === 0)
         {
            const banco = JSON.parse(localStorage.getItem("cd-produtos") || "[]");
            banco.push(produto);
            localStorage.setItem("cd-produtos", JSON.stringify(banco));
            alert("Produto salvo com sucesso");
            navigate('/listaproduto');
        } else {
            alert("Verifique! Há campos vazios!")
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
                        <input type="text" value={status} onChange={e => setStatus(e.target.value)} placeholder="Digite o status" />
                        <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Digite a descrição" />
                        <input type="number" value={estoque_minimo} onChange={e => setEstoque_minimo(e.target.value)}  />
                        <input type="number" value={estoque_maximo} onChange={e => setEstoque_maximo(e.target.value)}  />
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