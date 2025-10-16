link onde a apliação foi hospedada https://whatshub-utfpr.vercel.app

Sobre o projeto:

    -O WhatsHub é uma aplicação web focada em dois objetivos:
      -Gerar links para Whatsapp: O usuario pode criar links instantanamente a partir do numero de telefone e adicionar uma mensagem opcional, não tendo a necessidadde de salvar um contato na agenda do celular;
      -manter uma agenda de contatos local: Oferece uma agenda simples para que o usuário possa salvar contatos recorrentes diretamente na aplicação, facilitando mensagens futuras;

    -funcionalidades:
      -Criar um link: Cria um link com o numero de telefone;
      -Copiar link: Botão para copiar o link gerado para a área de transferência;
      -Abrir whatsapp: Abre o link diretamente em uma nova aba, iniciando a conversa;
      -Agende de contatos:Salva, edita e remove contatos, que ficam armazenados no banco de dados PostgreSQL do Supabase;

    -Tecnologias utilizadas:
      -React.js: utilizado para criação da interface;
      -Supabase: utilizado como banco de dados e autenticador;
      -React icons: Icones da interface;
      -API pública de QR Code (QRServer): Utilizada para criação de QRCodes

    -Execução do Projeto:
      -Para executar o projeto são necessario:
        -node.js
        -npm
      -passo a passo:
        -clone o repositorio na sua maquina
          - git clone https://github.com/erickm31/tarefa-dw.git
          - cd tarefa-dw
          


    -funcionalidades extras:
      -implementamos uma API que cria um QRCode a partir do link gerado pela aplicação, facilitando em encaminhar mensagens futuras 