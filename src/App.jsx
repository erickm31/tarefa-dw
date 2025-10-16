import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import GeradorDeLinks from './components/GeradorDeLinks.jsx';
import Agenda from './components/Agenda.jsx';
import './App.css';
import { supabase } from './supabaseClient.js';

function App() {
  const [numeroTelefone, setNumeroTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [linkGerado, setLinkGerado] = useState('');

  const [nomeContato, setNomeContato] = useState('');
  const [numeroContato, setNumeroContato] = useState('');
  const [contatos, setContatos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    buscarContatos();
  }, []);

  async function buscarContatos() {
    const { data, error } = await supabase
      .from('contatos')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error('Erro ao buscar contatos:', error);
    else setContatos(data);
  }

  const formatarNumeroTelefone = (valor) => {
    const numeroLimpo = valor.replace(/\D/g, '');
    let formatado = '';
    if (numeroLimpo.length > 0) formatado = `(${numeroLimpo.substring(0, 2)}`;
    if (numeroLimpo.length > 2) formatado += `) ${numeroLimpo.substring(2, 7)}`;
    if (numeroLimpo.length > 7) formatado += `-${numeroLimpo.substring(7, 11)}`;
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

  async function salvarContato() {
    if (!nomeContato || !numeroContato) {
      alert('Preencha o nome e o número do contato.');
      return;
    }

    if (editandoId) {
      const { error } = await supabase
        .from('contatos')
        .update({ nome: nomeContato, numero: numeroContato })
        .eq('id', editandoId);

      if (error) console.error('Erro ao atualizar contato:', error);
      else {
        setEditandoId(null);
        buscarContatos();
      }
    } else {
      const { error } = await supabase
        .from('contatos')
        .insert([{ nome: nomeContato, numero: numeroContato }]);

      if (error) console.error('Erro ao salvar contato:', error);
      else buscarContatos();
    }

    setNomeContato('');
    setNumeroContato('');
  }

  const editarContato = (contato) => {
    setEditandoId(contato.id);
    setNomeContato(contato.nome);
    setNumeroContato(contato.numero);
  };

  async function deletarContato(id) {
    const { error } = await supabase.from('contatos').delete().eq('id', id);
    if (error) console.error('Erro ao deletar contato:', error);
    else buscarContatos();
  }

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