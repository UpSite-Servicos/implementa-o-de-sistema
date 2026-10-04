/**
 * Autenticação SIMULADA inteiramente no navegador.
 *
 * LIMITAÇÃO DOCUMENTADA (ver README.md): isto NÃO é segurança real.
 * As "senhas" aqui ficam visíveis em texto puro no código-fonte
 * (js/data.js), porque não existe servidor para fazer a verificação
 * de forma protegida. Em produção, com PHP + MySQL (ver repositório
 * principal do SISGED), a senha é validada no servidor com hash
 * (password_hash/password_verify) e nunca fica exposta no navegador.
 * Esta versão existe apenas para demonstrar a interface (MVP front-end).
 */

function usuarioLogado() {
  const raw = sessionStorage.getItem("sisged_usuario_demo");
  return raw ? JSON.parse(raw) : null;
}

function exigirLogin() {
  if (!usuarioLogado()) {
    window.location.href = "index.html";
  }
}

function exigirPerfil(perfisPermitidos) {
  const usuario = usuarioLogado();
  if (!usuario) { window.location.href = "index.html"; return; }
  if (!perfisPermitidos.includes(usuario.perfil)) {
    document.body.innerHTML = `
      <div style="font-family:sans-serif;padding:60px;text-align:center">
        <h2>Acesso negado (simulado)</h2>
        <p>Seu perfil (${usuario.perfil}) não tem permissão para acessar esta página nesta demonstração.</p>
        <a href="dashboard.html">Voltar ao painel</a>
      </div>`;
    throw new Error("Acesso negado — perfil sem permissão.");
  }
}

function fazerLogin(email, senha) {
  const encontrado = USUARIOS_DEMO.find((u) => u.email === email && u.senha === senha);
  if (!encontrado) return false;
  sessionStorage.setItem("sisged_usuario_demo", JSON.stringify(encontrado));
  return true;
}

function fazerLogout() {
  sessionStorage.removeItem("sisged_usuario_demo");
  window.location.href = "index.html";
}
