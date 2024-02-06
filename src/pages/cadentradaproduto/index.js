import React, { useEffect, useState } from 'react';

import '../../pages/global.css';
import Menu from '../../componentes/Menu';

import { RiSave3Fill } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Head from '../../componentes/Head';

export default function Cadentradaproduto() {

    const navigate = useNavigate();
    const [idproduto, setIdproduto] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [valorunitario, setValorUnitario] = useState("");
    const [dataentrada, setDataentrada] = useState("");
    const [produtos, setProdutos] = useState([]);
    // const usuarios = ["carlos","carlos@gamil.com","123"]

    const cadentradaproduto = {
        id: Date.now().toString(5) + Math.floor(Math.pow(1, 5) + Math.random() * 9 * Math.pow(1, 5)).toString(5),
        idproduto,
        quantidade,
        valorunitario,
        dataentrada
    }

    function salvardados(e) {
        e.preventDefault();
        console.log(cadentradaproduto);

        if (idproduto == "")
            alert("Preencha com o nome da entrada")

        else if (quantidade == "")
            alert("Preencha com a quantidade escolhida")

        else if (valorunitario == "")
            alert("Preencha com o valor da unidade")

        else if (dataentrada == "")
            alert("Preencha com a data da entrada")

        else {
            const banco = JSON.parse(localStorage.getItem("cd-cadentradaproduto") || "[]");
            banco.push(cadentradaproduto)
            localStorage.setItem("cd-cadentradaproduto", JSON.stringify(banco));
            alert("Usuário salvo com sucesso");
            navigate('/entradaproduto');
        }
    }

    useEffect(()=>{
        buscarprodutos();
    },[])
     
    function buscarprodutos(){
        setProdutos(JSON.parse(localStorage.getItem("cd-produtos") || "[]"));
    }

    return (
        <div className="dashboard-container">

            <div className='menu'>
                <h1>Menu</h1>
                <Menu />
            </div>

            <div className='principal'>

                <Head title="Entrada de Produtos" />

                <div class="form-container">

                    <form className='form-cadastro' onSubmit={salvardados}>

                        <input type="text" value={idproduto} onChange={e => setIdproduto(e.target.value)} placeholder="Digite a entrada" />

                        <select value={idproduto} onChange={e => setIdproduto(e.target.value)} >
                            <option value>Produtos</option>
                            {
                                produtos.map((linha) => {
                                    return (
                                        <option value={linha.id}>{linha.descricao}</option>
                                    )
                                })
                            }

                        </select>

                        <input type="number" value={quantidade} onChange={e => setQuantidade(e.target.value)} placeholder="Digite a quantidade" />
                        <input type="number" value={valorunitario} onChange={e => setValorUnitario(e.target.value)} placeholder="Digite o valor da unidade" />
                        <input type="date" value={dataentrada} onChange={e => setDataentrada(e.target.value)} placeholder="Digite a data da entrada" />
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