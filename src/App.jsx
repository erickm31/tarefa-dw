import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import GeradorDeLinks from './components/GeradorDeLinks.jsx';
import Agenda from './components/Agenda.jsx';
import './App.css'; 

function App() {  const [numeroTelefone, setNumeroTelefone] = useState('');
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
    if (numeroLimpo.length > 0) { formatado = `(${numeroLimpo.substring(0, 2)}`; }
    if (numeroLimpo.length > 2) { formatado += `) ${numeroLimpo.substring(2, 7)}`; }
    if (numeroLimpo.length > 7) { formatado += `-${numeroLimpo.substring(7, 11)}`; }
    return formatado;
  };

  const prepararMensagem = () => {
    const numeroLimpo = numeroTelefone.replace(/\D/g, '');
    if (numeroLimpo.length >= 10) {
      let link = `https://wa.me/55${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;
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
      setContatos(contatos.map(c => c.id === editandoId ? { ...c, nome: nomeContato, numero: numeroContato } : c));
      setEditandoId(null);
    } else {
      setContatos([...contatos, { id: Date.now(), nome: nomeContato, numero: numeroContato }]);
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
    setContatos(contatos.filter(c => c.id !== id));
  };

  return (
    <div className="container">
      <header className="cabecalho">
        <h1><FaWhatsapp style={{ color: '#25D366' }} /> WhatsHub</h1>
        <p>O jeito mais rápido de iniciar conversas no WhatsApp. Gere links instantâneos e mantenha seus contatos organizados.</p>
      </header>

      <main className="conteudo-principal">
        <div className="cartao">
          <GeradorDeLinks
            numeroTelefone={numeroTelefone}
            mensagem={mensagem}
            linkGerado={linkGerado}
            onNumeroChange={(e) => setNumeroTelefone(formatarNumeroTelefone(e.target.value))}
            onMensagemChange={(e) => setMensagem(e.target.value)}
            onGerarLink={prepararMensagem}
            onCopiarLink={copiarParaAreaDeTransferencia}
          />
        </div>
        <div className="cartao">
          <Agenda
            nomeContato={nomeContato}
            numeroContato={numeroContato}
            editandoId={editandoId}
            onNomeChange={(e) => setNomeContato(e.target.value)}
            onNumeroChange={(e) => setNumeroContato(formatarNumeroTelefone(e.target.value))}
            onSalvar={salvarContato}
            contatos={contatos}
            onEditar={editarContato}
            onDeletar={deletarContato}
          />
        </div>
      </main>
    </div>
  );
}

export default App;