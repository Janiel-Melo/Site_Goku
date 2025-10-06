function cadastrar() {
    // 1. Pega os valores dos campos de cadastro
    const user = document.getElementById('reg-user').value;
    const pass = document.getElementById('reg-pass').value;
    const mensagem = document.getElementById('mensagem');

    if (!user || !pass) {
        mensagem.textContent = 'Erro: Por favor, preencha todos os campos para cadastrar.';
        return;
    }

    // 2. Verifica se o usuário já existe
    if (localStorage.getItem(user)) {
        mensagem.textContent = `Erro: O usuário "${user}" já está cadastrado.`;
        return;
    }

    // 3. Armazena o usuário e a senha no LocalStorage
    // A chave é o nome de usuário e o valor é a senha.
    // Lembrete: NUNCA FAÇA ISSO EM PROJETOS REAIS, pois é inseguro!
    localStorage.setItem(user, pass);

    mensagem.textContent = `Sucesso! Usuário "${user}" cadastrado e pronto para login.`;
    
    // Opcional: Limpa os campos após o cadastro
    document.getElementById('reg-user').value = '';
    document.getElementById('reg-pass').value = '';
}


// ===============================================
// FUNÇÃO DE LOGIN
// ===============================================
function logar() {
    // 1. Pega os valores dos campos de login
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;
    const mensagem = document.getElementById('mensagem');

    if (!user || !pass) {
        mensagem.textContent = 'Erro: Preencha usuário e senha.';
        return;
    }

    // 2. Tenta buscar a senha salva no LocalStorage, usando o nome de usuário como chave
    const senhaSalva = localStorage.getItem(user);

    // 3. Verifica se o usuário existe (se a chave foi encontrada)
    if (senhaSalva === null) {
        mensagem.textContent = 'Erro no Login: Usuário não encontrado.';
        return;
    }

    // 4. Compara a senha digitada com a senha salva
    if (pass === senhaSalva) {
        mensagem.textContent = `Login realizado com sucesso! Bem-vindo(a), ${user}!`;
        
        // **AÇÃO PÓS-LOGIN**
        // Aqui, você pode redirecionar o usuário para a página principal.
        localStorage.setItem('usuarioLogado', user);
       
        window.location.href = "index.html";  
    } else {
        mensagem.textContent = 'Erro no Login: Senha incorreta.';
    }
}
 
function verificarlogin() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        alert(`Bem-vindo de volta, ${usuarioLogado}!`);
    }       
}
function show(el, disp='block'){ if(el){ el.hidden=false; el.style.display=disp; } }
function hide(el){ if(el){ el.hidden=true; el.style.display=''; } }
function initialsFrom(s){ s=(s||'').trim(); return s ? (s.includes(' ')? s.split(' ').slice(0,2).map(w=>w[0]).join(''): s[0]).toUpperCase() : 'U'; }

function verificarStatusLogin(){
  const raw = localStorage.getItem('usuarioLogado');

  const linkLogin  = document.getElementById('link-login');   // seu link "Entre..."
  const linkLogout = document.getElementById('link-logout');
  const userBox    = document.getElementById('user-box');
  const userLink   = document.getElementById('user-link');
  const userIcon   = document.getElementById('user-icon');
  const avatar     = document.getElementById('avatar-usuario');
  const saudacao   = document.getElementById('saudacao-usuario');

  if(raw){
    if(linkLogin) hide(linkLogin);
    show(userBox, 'flex');
    show(linkLogout);
    if(userLink){ userLink.href='minha-conta.html'; userLink.title='Minha conta'; }

    const nome = raw; 
    if(saudacao){ saudacao.textContent = `Olá, ${nome}!`; show(saudacao, 'inline'); }
    if(avatar){ avatar.textContent = initialsFrom(nome); }

    if(userIcon){
      userIcon.onload  = () => { show(userIcon, 'inline-block'); hide(avatar); };
      userIcon.onerror = () => { hide(userIcon); show(avatar, 'grid'); };
      userIcon.src = './img/login-avatar.png';
    }
  }else{
    if(linkLogin) show(linkLogin);
    hide(userBox); hide(linkLogout);
  }
}
document.addEventListener('DOMContentLoaded', verificarStatusLogin);
// =================================================================
// FUNÇÃO LOGOUT (Para o link 'Sair')
// =================================================================
function logout() {
    localStorage.removeItem('usuarioLogado');
    // Redireciona para o login após sair
    window.location.replace("login.html");
}

// RODA A VERIFICAÇÃO ASSIM QUE A PÁGINA TERMINA DE CARREGAR
document.addEventListener('DOMContentLoaded', verificarStatusLogin);




