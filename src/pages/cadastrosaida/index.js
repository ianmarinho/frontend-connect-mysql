import React, { useState, useEffect } from 'react';
import { RiSave3Fill } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import '../../pages/global.css';
import Menu from '../../componentes/Menu';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import Head from '../../componentes/Head';
import api from '../../server/api';

export default function Cadastrosaida() {
  const navigate = useNavigate();
  const [idproduto, setIdproduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valorunitario, setValorunitario] = useState("");
  const [datasaida, setDatasaida] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [qtd_estoque, setQtd_estoque] = useState([0]);


  const saidaproduto = {
    id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
    idproduto,
    quantidade,
    valorunitario,
    datasaida,
  };

  useEffect(() => {
    mostrarproduto();
  }, []);

  // useEffect(() => {
  //   api.get(`/estoque/ ${idproduto}`).then((res) => {
  //     setQtd_estoque(res.data.estoque[0].quantidade)
  //   })
  // }, [idproduto]);




  function salvardados(e) {
    e.preventDefault();

    if (!idproduto || !quantidade || !valorunitario || !datasaida) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    api.post('/saida', saidaproduto)
      .then(function (response) {
        console.log(response.data);
        alert(response.data.mensagem);
        navigate('/listasaida');
      })
  }

  function mostrarproduto() {
    api.get('/produto')
      .then(function (response) {
        setProdutos(response.data.produto);
      })
  }

  return (
    <div className="dashboard-container">
      <div className="menu">
        <Menu />
      </div>
      <div className="principal">
        <Head title="Cadastro de Saída" />
        <div className="form-container">
          <form className="form-cadastro" onSubmit={salvardados}>
            <input
              type="text"
              value={idproduto}
              onChange={(e) => setIdproduto(e.target.value)}
              placeholder="Digite o id do produto"
            />
            <select value={idproduto} onChange={(e) => setIdproduto(e.target.value)}>
              <option key="default" disabled>Selecione um produto</option>
              {produtos.map((linha) => {
                return <option key={linha.id} value={linha.id}>{linha.descricao}</option>;
              })}
            </select>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              placeholder="Digite a quantidade"
            />
            <input
              type="number"
              value={valorunitario}
              onChange={(e) => setValorunitario(e.target.value)}
              placeholder="Digite o valor unitário"
            />
            <input
              type="date"
              value={datasaida}
              onChange={(e) => setDatasaida(e.target.value)}
              placeholder="Data de saída"
            />
            <div className="acao">
              <button type="submit" className="btn-save">
                Salvar <RiSave3Fill />
              </button>
              <button type="button" className="btn-cancel">
                Cancelar <MdOutlineCancel />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
