import './styles.css'

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logoImage from '../../assets/img/logo1.jpg';


export default function Logon() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const logar = (e) => {

        e.preventDefault();
        let banco = JSON.parse(localStorage.getItem("cd-usuarios") || "[]");

        let dadosnovos = banco.filter(item => item.email === email && item.senha === senha);
        console.log(banco);
        if (dadosnovos.length > 0) {
            navigate('/dashboard');
        } else {
            alert("Dados incorretos!!!");
        }

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
                    <input  className='input1'  placeholder="Digite seu email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input   className='input2'  placeholder="Digite sua senha" type='password' value={senha} onChange={e => setSenha(e.target.value)} />
                    <button className='button1' type="submit">Entrar</button>

                </form>
            </section>

        </div>
    )
}

