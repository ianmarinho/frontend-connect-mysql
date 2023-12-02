import React, {useState} from 'react';

import '../../pages/global.css';
import Menu from '../../componentes/menu'
import { FiFilePlus } from "react-icons/fi";
import { RiSave3Fill } from "react-icons/ri";
import { MdOutlineCancel, MdPadding } from "react-icons/md";
import { Link } from 'react-router-dom';
import Head from '../../componentes/menu/Head';

export default function Cadastrousuario() {

    const [nome,setNome] =useState("");

    return (
        <div className="dashboard-container">

            <div className='menu'>
                <h1>Menu</h1>
                <Menu />
            </div>

            <div className='principal'>

                <Head title="Cadastro de Usuário" />

                <div class="form-container">

                    <form className='form-cadastro'>
                        <input type="text" value={nome} onChange={e=>setNome(e.target.value)}  placeholder="Digite o nome de usuário" />
                        <input type="email" placeholder="Digite o email" />
                        <input type="password" placeholder="Digite a senha" />

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