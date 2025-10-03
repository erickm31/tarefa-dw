import React, { useState } from 'react';
import './App.css';
import { FaWhatsapp, FaLink, FaClipboard, FaTrash, FaPen, FaAddressBook, FaSave } from 'react-icons/fa';

function App() {
  const [numeroTelefone, setNumeroTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [linkGerado, setLinkGerado] = useState('');

  const [nomeContato, setNomeContato] = useState('');
  const [numeroContato, setNumeroContato] = useState('');
  const [contatos, setContatos] = useState([
  ]);
  const [editandoId, setEditandoId] = useState(null);

  const formatarNumeroTelefone = (valor) => {
    const numeroLimpo = valor.replace(/\D/g, '');
    let formatado = '';
    if (numeroLimpo.length > 0) {
      formatado = `(${numeroLimpo.substring(0, 2)}`;
    }
    if (numeroLimpo.length > 2) {
      formatado += `) ${numeroLimpo.substring(2, 7)}`;
    }
    if (numeroLimpo.length > 7) {
      formatado += `-${numeroLimpo.substring(7, 11)}`;
    }
    return formatado;
  };

  const aoMudarNumeroTelefonePrincipal = (evento) => {
    setNumeroTelefone(formatarNumeroTelefone(evento.target.value));
  };

  const aoMudarNumeroContato = (evento) => {
    setNumeroContato(formatarNumeroTelefone(evento.target.value));
  };

  const prepararMensagem = () => {
    const numeroLimpo = numeroTelefone.replace(/\D/g, '');
    if (numeroLimpo.length >= 10) {
      let link = `https://wa.me/55${numeroLimpo}`;
      if (mensagem) {
        link += `?text=${encodeURIComponent(mensagem)}`;
      }
      setLinkGerado(link);
    } else {
      alert('Por favor, insira um número de WhatsApp válido.');
    }
  };

  const copiarParaAreaDeTransferencia = () => {
    navigator.clipboard.writeText(linkGerado);
    alert('Link copiado para a área de transferência!');
  };

  const salvarContato = () => {
    if (!nomeContato || !numeroContato) {
      alert('Por favor, preencha o nome e o número do contato.');
      return;
    }

    if (editandoId !== null) {
      setContatos(contatos.map(contato =>
        contato.id === editandoId ? { ...contato, nome: nomeContato, numero: numeroContato } : contato
      ));
      setEditandoId(null);
    } else {
      const novoContato = {
        id: Date.now(),
        nome: nomeContato,
        numero: numeroContato
      };
      setContatos([...contatos, novoContato]);
    }
    setNomeContato('');
    setNumeroContato('');
  };

  const editarContato = (contato) => {
    setEditandoId(contato.id);
    setNomeContato(contato.nome);
    setNumeroContato(contato.numero);
  };

  const deletarContato = (id) => {
    setContatos(contatos.filter(contato => contato.id !== id));
  };


  return (
    <div className="container">
      <header className="cabecalho">
        <h1><FaWhatsapp style={{ color: '#25D366' }} /> WhatsHub</h1>
        <p>O jeito mais rápido de iniciar conversas no WhatsApp. Gere links instantâneos e mantenha seus contatos organizados.</p>
      </header>
      <main className="conteudo-principal">
        <div className="cartao">
          <h2 className="cartao-titulo"><FaLink /> Gerador de Links</h2>
          <div className="grupo-formulario">
            <label>Número do WhatsApp</label>
            <input
              type="text"
              placeholder="(44) 91234-1234"
              value={numeroTelefone}
              onChange={aoMudarNumeroTelefonePrincipal}
            />
          </div>
          <div className="grupo-formulario">
            <label>Mensagem (opcional)</label>
            <textarea
              placeholder="Digite sua mensagem aqui..."
              value={mensagem}
              onChange={(evento) => setMensagem(evento.target.value)}
            ></textarea>
          </div>
          <button className="botao botao-primario" onClick={prepararMensagem}>
            Preparar Mensagem
          </button>
          {linkGerado && (
            <div className="container-link-gerado">
              <label>Link gerado:</label>
              <div className="saida-link">
                <span>{linkGerado}</span>
                <button className="botao-icone" onClick={copiarParaAreaDeTransferencia}>
                  <FaClipboard />
                </button>
              </div>
              <a href={linkGerado} target="_blank" rel="noopener noreferrer" className="botao botao-secundario">
                Abrir WhatsApp
              </a>
            </div>
          )}
        </div>

        <div className="cartao">
          <h2 className="cartao-titulo"><FaAddressBook /> Agenda de Contatos</h2>
          <div className="formulario-contato">
            <div className="grupo-formulario">
              <label>Nome</label>
              <input
                type="text"
                placeholder="Nome do contato"
                value={nomeContato}
                onChange={(evento) => setNomeContato(evento.target.value)}
              />
            </div>
            <div className="grupo-formulario">
              <label>Número</label>
              <input
                type="text"
                placeholder="Número"
                value={numeroContato}
                onChange={aoMudarNumeroContato}
              />
            </div>
          </div>
          <button className="botao botao-primario botao-salvar" onClick={salvarContato}>
            <FaSave /> {editandoId ? 'Atualizar na Agenda' : 'Salvar na Agenda'}
          </button>

          <div className="lista-contatos">
            <h3>Seus Contatos ({contatos.length})</h3>
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
                  <button className="botao-icone" onClick={() => editarContato(contato)}>
                    <FaPen />
                  </button>
                  <button className="botao-icone botao-deletar" onClick={() => deletarContato(contato.id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;