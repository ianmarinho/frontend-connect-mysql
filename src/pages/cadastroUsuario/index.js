import React, { useState } from 'react';

import '../../pages/global.css';
import Menu from '../../componentes/menu'
import { FiFilePlus } from "react-icons/fi";
import { RiSave3Fill } from "react-icons/ri";
import { MdOutlineCancel, MdPadding } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Head from '../../componentes/menu/Head';

export default function Cadastrousuario() {

    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    // const usuarios = ["carlos","carlos@gamil.com","123"]

    const usuario = {
        id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
        nome,
        email,
        senha
    }
    function salvardados(e) {
        e.preventDefault();
        //console.log(usuario);

        if (nome == "")
            alert("Preencha o campo nome")

        else if (email == "")
            alert("Preencha o campo email")

        else if (senha == "")
            alert("Preencha o campo senha")

        else {
            const banco = JSON.parse(localStorage.getItem("cd-usuario") || "[]");
            banco.push(usuario)
            localStorage.setItem("cd-usuario", JSON.stringify(banco));
            alert("Usuário salvo com sucesso");
            navigate('/listausuario');
        }
    }

    return (
        <div className="dashboard-container">

            <div className='menu'>
                <h1>Menu</h1>
                <Menu />
            </div>

            <div className='principal'>

                <Head title="Cadastro de Usuário" />

                <div class="form-container">

                    <form className='form-cadastro' onSubmit={salvardados}>
                        <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Digite o nome de usuário" />
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite o email" />
                        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Digite a senha" />

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