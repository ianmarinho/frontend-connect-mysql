import React, { useEffect, useState } from 'react';
import '../../pages/global.css';
import Menu from '../../componentes/Menu';
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Head from '../../componentes/Head';
import api from '../../server/api';

export default function Cadastrosaida() {
  const navigate = useNavigate();
  const [idproduto, setIdproduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valorunitario, setValorUnitario] = useState("");
  const [datasaida, setDatasaida] = useState("");
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    mostrardados();
  }, []);

  function mostrardados() {
    api.get('/produto')
      .then(function (response) {
        setProdutos(response.data.produto);
      })
      .catch(function (error) {
        console.error('Erro ao obter produtos:', error);
      });
  }

  function salvardados(e) {
    e.preventDefault();

    let i = 0;
    if (!idproduto || !quantidade || !valorunitario || !datasaida) {
      i++;
    }
    if (i === 0) {
      const cadastrosaida = {
        idproduto,
        quantidade,
        valorunitario,
        datasaida
      };

      api.post('/saida', cadastrosaida)
        .then(function (response) {
          alert(response.data.mensagem);
          navigate('/listasaida');
        })
        .catch(function (error) {
          console.error('Erro ao cadastrar saída:', error);
        });
    } else {
      alert("Verifique! Há campos vazios!");
    }
  }

  return (
    <div className="dashboard-container">
      <div className='menu'>
        <Menu />
      </div>
      <div className='principal'>
        <Head title="Cadastro de Saída" />
        <div className='form-container'>
          <form className='form-cadastro' onSubmit={salvardados}>
            <select value={idproduto} onChange={e => setIdproduto(e.target.value)}>
              <option value="">Selecione um produto</option>
              {produtos.map((produto) => (
                <option key={produto.id_} value={produto.id_}>
                  {produto.descricao}
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
              value={datasaida}
              onChange={e => setDatasaida(e.target.value)}
              placeholder='Data da Saída'
            />
            <div className='acao'>
              <button className='btn-save'>
                <FaSave />
                Salvar
              </button>
              <button className='btn-cancel'>
                <MdCancel />
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
