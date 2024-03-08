import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componentes/Menu';
import { FiFilePlus } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import Head from '../../componentes/Head';
import api from '../../server/api';

export default function Editarproduto() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [descricao, setDescricao] = useState("");
  const [estoque_minimo, setEstoque_minimo] = useState("");
  const [estoque_maximo, setEstoque_maximo] = useState("");

  useEffect(() => {
    mostrardados(id);
  }, [id]);

  async function mostrardados(idu) {
    try {
      const response = await api.get(`/produto/${idu}`);
      if (response.status === 200) {
        setStatus(response.data.produto[0].status);
        setDescricao(response.data.produto[0].descricao);
        setEstoque_minimo(response.data.produto[0].estoque_minimo);
        setEstoque_maximo(response.data.produto[0].estoque_maximo);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function salvardados(e) {
    e.preventDefault();

    if (!status || !descricao || !estoque_minimo || !estoque_maximo) {
      alert("Verifique! Há campos vazios!");
      return;
    }

    const produto = {
      id,
      status,
      descricao,
      estoque_minimo,
      estoque_maximo
    };

    api.put('/produto', produto, { headers: { "Content-Type": "application/json" } })
      .then(function (response) {
        console.log(response.data);
        alert(response.data.mensagem);
        navigate('/listaproduto');
      })
      .catch(function (error) {
        console.error("Error updating data:", error);
        alert("Erro ao salvar os dados");
      });
  }

  return (
    <div className="dashboard-container">
      <div className='menu'>
        <Menu />
      </div>
      <div className='principal'>
        <Head title="Editar Produto" />
        <div className='form-container'>
          <form className='form-cadastro' onSubmit={salvardados} >
            <input
              type='text'
              value={status}
              onChange={e => setStatus(e.target.value)}
              placeholder='Digite o status'
            />
            <input
              type='text'
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder='Digite a descrição'
            />
            <input
              type='number'
              value={estoque_minimo}
              onChange={e => setEstoque_minimo(e.target.value)}
              placeholder='Digite o valor minimo'
            />
            <input
              type='number'
              value={estoque_maximo}
              onChange={e => setEstoque_maximo(e.target.value)}
              placeholder='Digite o valor máximo'
            />
            <div className='acao'>
              <button type="submit" className='btn-save'>
                <FaSave />
                Salvar
              </button>
              <button type="button" className='btn-cancel' onClick={() => navigate('/listaproduto')}>
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
