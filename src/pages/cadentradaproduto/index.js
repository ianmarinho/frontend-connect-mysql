import React, { useEffect, useState } from 'react';

import '../../pages/global.css';
import Menu from '../../componentes/Menu';
import { RiSave3Fill } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
import { MdOutlineCancel, MdCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Head from '../../componentes/Head';
import api from '../../server/api';

export default function Cadentradaproduto() {
    const navigate = useNavigate();
    const [idproduto, setIdproduto] = useState("");
    const [maximo, setMaximo] = useState(0);
    const [estoquemaximo, setEstoquemaximo] = useState(0);
    const [quantidade, setQuantidade] = useState("");
    const [valorunitario, setValorUnitario] = useState("");
    const [dataentrada, setDataentrada] = useState("");
    const [produtos, setProdutos] = useState([]);

    const cadentradaproduto = {
        id: Date.now().toString(5) + Math.floor(Math.pow(1, 5) + Math.random() * 9 * Math.pow(1, 5)).toString(5),
        idproduto,
        quantidade,
        valorunitario,
        dataentrada
    }

    const dadosestoque = {
        id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
        idproduto,
        quantidade,
        valorunitario,
    }


    function alterarEstoque(idproduto, quantidade, valor) {
        const estoque = JSON.parse(localStorage.getItem("cd-estoques") || "[]");
        const produtoExistente = estoque.find(item => item.idproduto === idproduto);

        if (produtoExistente) {

            let dadosnovos = estoque.filter(item => item.idproduto !== idproduto);
            const updateestoque = {
                id: produtoExistente.id,
                idproduto: produtoExistente.idproduto,
                quantidade: produtoExistente.quantidade + quantidade,
                valorunitario: produtoExistente.valorunitario = valor
            }

            dadosnovos.push(updateestoque);
            localStorage.setItem("cd-estoques", JSON.stringify(dadosnovos));
        } else {


            estoque.push(dadosestoque);
        }

        // Atualizar o localStorage com os novos dados do estoque
        // localStorage.setItem("cd-estoques", JSON.stringify(estoque));
    }

    useEffect(() => {
        mostrarproduto();
    }, [])

    function salvardados(e) {
        e.preventDefault();

        let i = 0;
        if (idproduto == "")
            i++;
        else if (quantidade == "" || quantidade == 0)
            i++;
        else if (valorunitario == "" || valorunitario == 0)
            i++;
        else if (dataentrada == "")
            i++;
        if (i == 0) {

            api.post('/entrada', cadentradaproduto,
                { headers: { "Content-Type": "application/json" } })
                .then(function (response) {
                    console.log(response.data)
                    alert(response.data.mensagem);
                    navigate('/entradaproduto');
                }

                )


        } else {
            alert("Verifique! Há campos vazios!")
        }
    }

    function mostrarproduto() {

        api.get('/produto',
            { headers: { "Content-Type": "application/json" } })
            .then(function (response) {
                setProdutos(response.data.produto);
                console.log(produtos)
            })

    }

    return (
        <div className="dashboard-container">

            <div className='menu'>

                <Menu />
            </div>
            <div className='principal'>
                <Head title="Cadastro de Entrada" />
                <div className='form-container'>
                    <form className='form-cadastro' onSubmit={salvardados} >
                        <input
                            type='text'
                            value={idproduto}
                            onChange={e => setIdproduto(e.target.value)}
                            placeholder='Digite o id do produto'
                        />
                   
                        
                        <select value={idproduto} onChange={e => setIdproduto(e.target.value)}>
                        <option>Selecione um produto</option>
                        {produtos.map((linha) => (
                            <option key={linha.id_} value={linha.id_}>
                                {linha.descricao}
                            </option>
                        ))}
                    </select>


                        <input
                            type='number'
                            value={quantidade}
                            onChange={e => setQuantidade(e.target.value)}
                            placeholder='Digite a quantidade'
                        />
                        <input
                            type='number'
                            value={valorunitario}
                            onChange={e => setValorUnitario(e.target.value)}
                            placeholder='Digite o valor unitário'
                        />
                        <input
                            type='date'
                            value={dataentrada}
                            onChange={e => setDataentrada(e.target.value)}
                            placeholder='Data da Entrada'
                        />
                        <div className='acao'>
                            <button className='btn-save'>
                                <FaSave />
                                Salvar
                            </button>
                            <button className='btn-cancel'>
                                <MdCancel />
                                Cancelar</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>

    )

}