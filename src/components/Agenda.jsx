import React from 'react';
import { FaAddressBook, FaSave } from 'react-icons/fa';
import ListaDeContatos from './ListaDeContatos.jsx';

function Agenda({
  nomeContato,
  numeroContato,
  editandoId,
  onNomeChange,
  onNumeroChange,
  onSalvar,
  contatos,
  onEditar,
  onDeletar
}) {
  return (
    <>
      <h2 className="cartao-titulo"><FaAddressBook /> Agenda de Contatos</h2>
      <div className="formulario-contato">
        <div className="grupo-formulario">
          <label htmlFor="contact-name">Nome</label>
          <input
            id="contact-name"
            type="text"
            placeholder="Nome do contato"
            value={nomeContato}
            onChange={onNomeChange}
          />
        </div>
        <div className="grupo-formulario">
          <label htmlFor="contact-number">Número</label>
          <input
            id="contact-number"
            type="text"
            placeholder="Número"
            value={numeroContato}
            onChange={onNumeroChange}
          />
        </div>
      </div>
      <button className="botao botao-primario botao-salvar" onClick={onSalvar}>
        <FaSave /> {editandoId ? 'Atualizar na Agenda' : 'Salvar na Agenda'}
      </button>

      <ListaDeContatos contatos={contatos} onEditar={onEditar} onDeletar={onDeletar} />
    </>
  );
}

export default Agenda;