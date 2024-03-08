import './styles.css'

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logoImage from '../../assets/img/logo1.jpg';
import api from '../../server/api';


export default function Logon() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const log = {
        email,
        senha
    }

    const logar = (e) => {

        e.preventDefault();
        // let banco = JSON.parse(localStorage.getItem("cd-usuarios") || "[]");
        // let dadosnovos = banco.filter(item => item.email === email && item.senha === senha);

        api.post("/usuario/login", log)
            .then( res => {
                
                if (res.status == 200) {
                    alert(res.data.mensagem)
                    navigate('/dashboard');

                }

                if (res.status === 404) {
                    alert(res.data.mensagem)
                }
            })


    }


    return (


        <div className="logon-container">

            <div className='logo'>
                {/* Adicione a imagem acima dos inputs */}
                <img src={logoImage} alt="Logo" className="logo-image" />
            </div>

            <section className="form">
                <h1>Faça seu login</h1>
                <form onSubmit={logar}>
                    <input className='input1' placeholder="Digite seu email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input className='input2' placeholder="Digite sua senha" type='password' value={senha} onChange={e => setSenha(e.target.value)} />
                    <button className='button1' type="submit">Entrar</button>
                    <a className='novo' href="/cadastrousuario">Novo Cadastro</a>
                    

                </form>
            </section>

        </div>
    )
}