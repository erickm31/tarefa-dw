import React from 'react';
import { FaLink, FaClipboard } from 'react-icons/fa';

function GeradorDeLinks({
  numeroTelefone,
  mensagem,
  linkGerado,
  onNumeroChange,
  onMensagemChange,
  onGerarLink,
  onCopiarLink
}) {
  return (
    <>
      <h2 className="cartao-titulo"><FaLink /> Gerador de Links</h2>

      <div className="grupo-formulario">
        <label htmlFor="whatsapp-number">Número do WhatsApp</label>
        <input
          id="whatsapp-number"
          type="text"
          placeholder="(44) 91234-1234"
          value={numeroTelefone}
          onChange={onNumeroChange}
        />
      </div>

      <div className="grupo-formulario">
        <label htmlFor="message">Mensagem (opcional)</label>
        <textarea
          id="message"
          placeholder="Digite sua mensagem aqui..."
          value={mensagem}
          onChange={onMensagemChange}
        ></textarea>
      </div>

      <button className="botao botao-primario" onClick={onGerarLink}>
        Preparar Mensagem
      </button>

      {linkGerado && (
        <div className="container-link-gerado">
          <label htmlFor="generated-link">Link gerado:</label>
          <div className="saida-link">
            <span>{linkGerado}</span>
            <button className="botao-icone" onClick={onCopiarLink}>
              <FaClipboard />
            </button>
          </div>

          <a
            href={linkGerado}
            target="_blank"
            rel="noopener noreferrer"
            className="botao botao-secundario"
          >
            Abrir WhatsApp
          </a>


          <div className="qr-code-container" style={{ marginTop: '1rem', textAlign: 'center' }}>
            <h4>QR Code do link:</h4>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(linkGerado)}`}
              alt="QR Code do link"
              style={{ marginTop: '0.5rem', borderRadius: '8px', boxShadow: '0 0 8px rgba(0,0,0,0.1)' }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default GeradorDeLinks;
