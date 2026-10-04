# SISGED — MVP Front-end estático (UpSite)

Esta é a versão **somente front-end** do SISGED, preparada para ser publicada
em plataformas de hospedagem estática (GitHub Pages e Cloudflare Pages), que
não executam PHP nem se conectam a um banco de dados real.

> Esta é uma versão de demonstração da interface. A versão completa e
> funcional do sistema, com PHP + MySQL reais, está no repositório principal
> do projeto SISGED.

## O que esta versão faz

- Todas as telas visuais do SISGED (login, painel, Instrutores, Alunos,
  Salas, Turmas, Aulas, Relatórios), com o mesmo visual (Bootstrap + CSS
  próprio) da versão real.
- Login simulado, com 3 perfis de demonstração (ver abaixo).
- Cadastro, edição e exclusão **simulados**: os dados ficam guardados no
  `localStorage` do navegador de quem está testando — não existe banco de
  dados compartilhado entre pessoas diferentes.
- A regra de conflito de horário (sala/instrutor ocupados) foi
  **reimplementada em JavaScript**, reproduzindo a mesma lógica da versão
  PHP, só que rodando inteiramente no navegador.

## Contas de demonstração

| E-mail | Senha | Perfil |
|---|---|---|
| coordenacao@sisged.com.br | 123456 | Coordenação |
| carlos.andrade@sisged.com.br | 123456 | Instrutor |
| ana.santos@aluno.sisged.com.br | 123456 | Aluno |

## Estrutura do projeto

```
sisged-frontend/
├── index.html        → tela de login
├── dashboard.html     → painel
├── instrutores.html   → CRUD de instrutores (simulado)
├── alunos.html        → CRUD de alunos + matrícula em turmas (simulado)
├── salas.html         → CRUD de salas (simulado)
├── turmas.html        → CRUD de turmas / consulta por perfil
├── aulas.html          → CRUD de aulas com verificação de conflito de horário
├── relatorios.html     → filtros e relatório de aulas
├── css/style.css       → estilo visual (idêntico à versão PHP)
├── js/data.js           → dados simulados (substitui o banco MySQL)
├── js/auth.js            → login/sessão simulados (substitui a autenticação PHP)
├── js/layout.js           → monta cabeçalho e menu lateral dinamicamente
└── img/                    → logos (SENAI/SESI)
```

## Como testar localmente

Basta abrir `index.html` diretamente no navegador (duplo clique) — não
precisa de servidor local, já que tudo é HTML/CSS/JS puro.

## Limitações desta versão (importante — leia antes de usar)

Esta versão **não é segura nem funcional como um sistema real**, porque:

- **Não executa PHP.** Não existe backend processando nada — toda a lógica
  (validações, regras de negócio) roda só no navegador de quem está vendo a
  página, e pode ser manipulada por quem souber abrir o console do navegador.
- **Não se conecta a MySQL/MariaDB.** Os dados são simulados em arrays
  JavaScript e salvos apenas no `localStorage` do navegador — cada pessoa que
  acessa tem sua própria cópia dos dados, sem sincronização entre usuários.
- **A autenticação não é real.** As senhas de demonstração ficam visíveis no
  código-fonte (`js/data.js`). Isso nunca deve ser feito em um sistema de
  produção — na versão PHP real, a senha é protegida com hash
  (`password_hash`/`password_verify`) e verificada no servidor.
- **Upload de arquivos, autenticação real e persistência entre usuários**
  exigiriam um backend (PHP) e um banco de dados reais, como na versão
  completa do SISGED.
- **Variáveis sensíveis:** nenhuma credencial real foi usada nesta versão —
  apenas contas fictícias de demonstração.

## Evolução para uma aplicação completa

Para transformar este MVP em um sistema completo, seria necessário publicar
o back-end real (PHP + MySQL) em um servidor que execute PHP — como os
provedores avaliados na atividade de orçamento de hospedagem do SISGED
(hospedagem compartilhada, VPS ou cloud) — e depois conectar este front-end a
uma API real, em vez dos arrays simulados em `js/data.js`.
