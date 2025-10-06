import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

function ListaDeContatos({ contatos, onEditar, onDeletar }) {
  return (
    <div className="lista-contatos">
      <h3>Seus Contatos ({contatos.length})</h3>
      {contatos.length === 0 && <p>Nenhum contato salvo.</p>}
      {contatos.map(contato => (
        <div key={contato.id} className="item-contato">
          <div className="info-contato">
            <span className="nome-contato">{contato.nome}</span>
            <span className="numero-contato">{contato.numero}</span>
          </div>
          <div className="acoes-contato">
            <button className="botao-acao-contato" onClick={() => {
              const numeroLimpo = contato.numero.replace(/\D/g, '');
              window.open(`https://wa.me/55${numeroLimpo}`, '_blank');
            }}>
              Mensagem
            </button>
            <button className="botao-icone" onClick={() => onEditar(contato)}>
              <FaPen />
            </button>
            <button className="botao-icone botao-deletar" onClick={() => onDeletar(contato.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListaDeContatos;