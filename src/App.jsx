import React, { useState } from 'react';
import { FaWhatsapp, FaLink, FaClipboard, FaTrash, FaPen, FaAddressBook, FaSave } from 'react-icons/fa';

function App() {
  const [numeroTelefone, setNumeroTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [linkGerado, setLinkGerado] = useState('');

  const [nomeContato, setNomeContato] = useState('');
  const [numeroContato, setNumeroContato] = useState('');
  const [contatos, setContatos] = useState([ ]);
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
    <div>
      <header>
        <h1><FaWhatsapp /> WhatsHub</h1>
        <p>O jeito mais rápido de iniciar conversas no WhatsApp. Gere links instantâneos e mantenha seus contatos organizados.</p>
      </header>

      <hr />

      <main>
        <section>
          <h2><FaLink /> Gerador de Links</h2>
          <div>
            <label htmlFor="whatsapp-number">Número do WhatsApp</label>
            <br />
            <input
              id="whatsapp-number"
              type="text"
              placeholder="(44) 91234-1234"
              value={numeroTelefone}
              onChange={aoMudarNumeroTelefonePrincipal}
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label htmlFor="message">Mensagem (opcional)</label>
            <br />
            <textarea
              id="message"
              placeholder="Digite sua mensagem aqui..."
              value={mensagem}
              onChange={(evento) => setMensagem(evento.target.value)}
            ></textarea>
          </div>
          <button style={{ marginTop: '1rem' }} onClick={prepararMensagem}>
            Preparar Mensagem
          </button>
          {linkGerado && (
            <div style={{ marginTop: '1rem' }}>
              <label htmlFor="generated-link">Link gerado:</label>
              <br />
              <input 
                id="generated-link"
                type="text" 
                value={linkGerado} 
                readOnly 
              />
              <button onClick={copiarParaAreaDeTransferencia}>
                <FaClipboard /> Copiar
              </button>
              <br />
              <a href={linkGerado} target="_blank" rel="noopener noreferrer">
                <button style={{ marginTop: '0.5rem' }}>Abrir WhatsApp</button>
              </a>
            </div>
          )}
        </section>

        <hr />

        <section>
          <h2><FaAddressBook /> Agenda de Contatos</h2>
          <div>
            <label htmlFor="contact-name">Nome</label>
            <br />
            <input
              id="contact-name"
              type="text"
              placeholder="Nome do contato"
              value={nomeContato}
              onChange={(evento) => setNomeContato(evento.target.value)}
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label htmlFor="contact-number">Número</label>
            <br />
            <input
              id="contact-number"
              type="text"
              placeholder="Número"
              value={numeroContato}
              onChange={aoMudarNumeroContato}
            />
          </div>
          <button style={{ marginTop: '1rem' }} onClick={salvarContato}>
            <FaSave /> {editandoId ? 'Atualizar na Agenda' : 'Salvar na Agenda'}
          </button>

          <div style={{ marginTop: '2rem' }}>
            <h3>Seus Contatos ({contatos.length})</h3>
            {contatos.map(contato => (
              <div key={contato.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                <div>
                  <strong>{contato.nome}</strong>
                  <br />
                  <span>{contato.numero}</span>
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <button onClick={() => {
                    const numeroLimpo = contato.numero.replace(/\D/g, '');
                    window.open(`https://wa.me/55${numeroLimpo}`, '_blank');
                  }}>
                    Mensagem
                  </button>
                  <button onClick={() => editarContato(contato)}>
                    <FaPen /> Editar
                  </button>
                  <button onClick={() => deletarContato(contato.id)}>
                    <FaTrash /> Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;