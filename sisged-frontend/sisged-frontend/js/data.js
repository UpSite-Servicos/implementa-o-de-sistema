/**
 * SISGED — MVP Front-end estático
 * ---------------------------------------------------------------
 * Este arquivo SIMULA o banco de dados MySQL usando apenas arrays
 * em memória (JavaScript). Nada aqui é persistido em servidor algum.
 *
 * Em cada recarregamento de página sem dados salvos no localStorage,
 * os dados voltam a este estado inicial (os mesmos dados de exemplo
 * usados na versão real do SISGED, em PHP + MySQL).
 *
 * LIMITAÇÃO DOCUMENTADA: como é um site estático, os dados ficam
 * salvos apenas no localStorage do navegador de quem está usando —
 * não existe um banco único compartilhado entre usuários diferentes,
 * como existiria com o MySQL real.
 */

const DADOS_INICIAIS = {
  instrutores: [
    { id: 1, nome: "Carlos Andrade", email: "carlos.andrade@sisged.com.br", telefone: "(31) 98888-1111", especialidade: "Desenvolvimento Web" },
    { id: 2, nome: "Fernanda Lima", email: "fernanda.lima@sisged.com.br", telefone: "(31) 98888-2222", especialidade: "Redes de Computadores" },
    { id: 3, nome: "Marcos Souza", email: "marcos.souza@sisged.com.br", telefone: "(31) 98888-3333", especialidade: "Banco de Dados" },
  ],
  alunos: [
    { id: 1, nome: "Ana Beatriz Santos", email: "ana.santos@aluno.sisged.com.br", matricula: "2026001", telefone: "(31) 97777-1111", turmas: [1, 3] },
    { id: 2, nome: "Bruno Costa", email: "bruno.costa@aluno.sisged.com.br", matricula: "2026002", telefone: "(31) 97777-2222", turmas: [1] },
    { id: 3, nome: "Camila Ferreira", email: "camila.ferreira@aluno.sisged.com.br", matricula: "2026003", telefone: "(31) 97777-3333", turmas: [2, 3] },
    { id: 4, nome: "Diego Martins", email: "diego.martins@aluno.sisged.com.br", matricula: "2026004", telefone: "(31) 97777-4444", turmas: [2] },
  ],
  salas: [
    { id: 1, nome: "Sala 101", capacidade: 30, localizacao: "Bloco A - 1º andar", recursos: "Projetor, Quadro branco" },
    { id: 2, nome: "Lab. Informática 1", capacidade: 25, localizacao: "Bloco B - Térreo", recursos: "25 computadores, Projetor, Ar-condicionado" },
    { id: 3, nome: "Sala 205", capacidade: 20, localizacao: "Bloco A - 2º andar", recursos: "TV, Quadro branco" },
  ],
  turmas: [
    { id: 1, nome: "Turma A - Dev Web 2026/2", disciplina: "Desenvolvimento Web", instrutorId: 1, turno: "Manhã" },
    { id: 2, nome: "Turma B - Redes 2026/2", disciplina: "Redes de Computadores", instrutorId: 2, turno: "Tarde" },
    { id: 3, nome: "Turma C - Banco de Dados 2026/2", disciplina: "Banco de Dados", instrutorId: 3, turno: "Noite" },
  ],
  aulas: [
    { id: 1, turmaId: 1, salaId: 2, instrutorId: 1, data: "2026-11-02", horaInicio: "08:00", horaFim: "10:00", status: "Agendada", observacoes: "Introdução a HTML/CSS" },
    { id: 2, turmaId: 2, salaId: 1, instrutorId: 2, data: "2026-11-02", horaInicio: "13:30", horaFim: "15:30", status: "Agendada", observacoes: "Camadas do modelo OSI" },
    { id: 3, turmaId: 3, salaId: 3, instrutorId: 3, data: "2026-11-02", horaInicio: "19:00", horaFim: "21:00", status: "Agendada", observacoes: "Modelagem ER" },
    { id: 4, turmaId: 1, salaId: 2, instrutorId: 1, data: "2026-11-04", horaInicio: "08:00", horaFim: "10:00", status: "Agendada", observacoes: "Introdução a JavaScript" },
  ],
};

// Usuários de demonstração (login simulado — ver js/auth.js)
const USUARIOS_DEMO = [
  { email: "coordenacao@sisged.com.br", senha: "123456", nome: "Coordenação UpSite", perfil: "coordenacao", referenciaId: null },
  { email: "carlos.andrade@sisged.com.br", senha: "123456", nome: "Carlos Andrade", perfil: "instrutor", referenciaId: 1 },
  { email: "ana.santos@aluno.sisged.com.br", senha: "123456", nome: "Ana Beatriz Santos", perfil: "aluno", referenciaId: 1 },
];

/** Carrega os dados do localStorage, ou usa os dados iniciais na primeira vez. */
function carregarDados() {
  const salvo = localStorage.getItem("sisged_dados_demo");
  if (salvo) {
    try { return JSON.parse(salvo); } catch (e) { /* ignora e recarrega padrão */ }
  }
  return JSON.parse(JSON.stringify(DADOS_INICIAIS));
}

/** Salva os dados no localStorage (persistência somente local, por navegador). */
function salvarDados(dados) {
  localStorage.setItem("sisged_dados_demo", JSON.stringify(dados));
}

/** Restaura os dados de exemplo originais (botão "Restaurar dados de demonstração"). */
function restaurarDadosIniciais() {
  localStorage.removeItem("sisged_dados_demo");
}

let DB = carregarDados();
function persistir() { salvarDados(DB); }
