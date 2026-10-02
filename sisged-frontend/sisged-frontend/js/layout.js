/**
 * Monta a barra superior e o menu lateral em volta do conteúdo de cada
 * página, lendo o usuário da sessão simulada (ver js/auth.js).
 * Isso evita repetir o mesmo HTML de cabeçalho em todos os arquivos .html.
 */
function montarLayout(paginaAtual) {
  const usuario = usuarioLogado();
  if (!usuario) return;

  const menus = {
    coordenacao: [
      ["dashboard.html", "📊", "Painel"],
      ["instrutores.html", "👤", "Instrutores"],
      ["alunos.html", "🎓", "Alunos"],
      ["salas.html", "🏫", "Salas"],
      ["turmas.html", "📚", "Turmas"],
      ["aulas.html", "🗓️", "Aulas"],
      ["relatorios.html", "📄", "Relatórios"],
    ],
    instrutor: [
      ["dashboard.html", "📊", "Painel"],
      ["turmas.html", "📚", "Minhas Turmas"],
      ["aulas.html", "🗓️", "Minhas Aulas"],
      ["relatorios.html", "📄", "Relatórios"],
    ],
    aluno: [
      ["dashboard.html", "📊", "Painel"],
      ["turmas.html", "📚", "Minhas Turmas"],
      ["aulas.html", "🗓️", "Minhas Aulas"],
    ],
  };

  const itensMenu = (menus[usuario.perfil] || [])
    .map(([href, icone, label]) => `
      <li class="nav-item">
        <a class="nav-link ${href === paginaAtual ? "fw-bold" : ""}" href="${href}">${icone} ${label}</a>
      </li>`)
    .join("");

  const chrome = `
    <nav class="navbar navbar-dark sisged-topbar px-3">
      <button class="btn btn-sm btn-outline-light d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#sisgedSidebar">☰</button>
      <a class="navbar-brand d-flex align-items-center gap-3" href="dashboard.html">
        <img src="img/senai_negativa.png" alt="SENAI" height="26">
        <img src="img/sesi_negativa.png" alt="SESI" height="26">
        <span class="fw-bold border-start ps-3">UpSite</span>
      </a>
      <div class="ms-auto d-flex align-items-center text-white gap-3">
        <span class="d-none d-sm-inline small">${usuario.nome} · <span class="badge bg-light text-dark text-capitalize">${usuario.perfil}</span></span>
        <button onclick="fazerLogout()" class="btn btn-sm btn-outline-light">Sair</button>
      </div>
    </nav>
    <div class="demo-banner">
      ⚠️ <strong>MVP de demonstração</strong> — front-end estático, sem backend real. Dados simulados no navegador (ver README do repositório).
    </div>
    <div class="d-flex">
      <div class="offcanvas-md offcanvas-start sisged-sidebar" tabindex="-1" id="sisgedSidebar">
        <div class="offcanvas-body p-0">
          <ul class="nav flex-column pt-3">${itensMenu}</ul>
        </div>
      </div>
      <main class="flex-grow-1 p-3 p-md-4 sisged-content" id="layout-main-slot"></main>
    </div>
    <footer class="text-center text-muted small py-3">UpSite (SISGED) — MVP front-end estático</footer>
  `;

  const conteudoOriginal = document.getElementById("conteudo-pagina");
  const wrapper = document.createElement("div");
  wrapper.innerHTML = chrome;
  document.body.insertBefore(wrapper, document.body.firstChild);
  document.getElementById("layout-main-slot").appendChild(conteudoOriginal);
  conteudoOriginal.classList.remove("d-none");
}
