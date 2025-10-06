function cadastrar() {
    const user = document.getElementById('reg-user').value;
    const pass = document.getElementById('reg-pass').value;
    const mensagem = document.getElementById('mensagem');

    if (!user || !pass) {
        mensagem.textContent = 'Erro: Por favor, preencha todos os campos para cadastrar.';
        return;
    }

    if (localStorage.getItem(user)) {
        mensagem.textContent = `Erro: O usuário "${user}" já está cadastrado.`;
        return;
    }

    localStorage.setItem(user, pass);

    localStorage.setItem('usuarioLogado', user);
    localStorage.setItem('justLoggedIn', 'true');

    mensagem.textContent = `Sucesso! Usuário "${user}" cadastrado! Redirecionando...`;

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function logar() {
    
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;
    const mensagem = document.getElementById('mensagem');

    if (!user || !pass) {
        mensagem.textContent = 'Erro: Preencha usuário e senha.';
        return;
    }

    const senhaSalva = localStorage.getItem(user);

    if (senhaSalva === null) {
        mensagem.textContent = 'Erro no Login: Usuário não encontrado.';
        return;
    }

    if (pass === senhaSalva) {
        mensagem.textContent = `Login realizado com sucesso! Bem-vindo(a), ${user}!`;

     
        localStorage.setItem('usuarioLogado', user);
        localStorage.setItem('justLoggedIn', 'true'); 

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

  const linkLogin  = document.getElementById('link-login');
  const userBox    = document.getElementById('user-box');
  const userIcon   = document.getElementById('user-icon');

  if(raw){
    if(linkLogin) {
      linkLogin.style.display = 'none';
    }

    if(userBox) {
      userBox.style.setProperty('display', 'flex', 'important');
      userBox.style.alignItems = 'center';
      userBox.style.position = 'relative';
      userBox.style.marginRight = '10px';
    }

    if(userIcon){
      userIcon.style.display = 'block';
      userIcon.style.width = '35px';
      userIcon.style.height = '35px';
    }
  }else{
    if(linkLogin) linkLogin.style.display = 'inline-block';
    if(userBox) userBox.style.setProperty('display', 'none', 'important');
  }
}
document.addEventListener('DOMContentLoaded', verificarStatusLogin);

function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.replace("login.html");
}

document.addEventListener('DOMContentLoaded', verificarStatusLogin);
document.addEventListener('DOMContentLoaded', function() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const justLoggedIn = localStorage.getItem('justLoggedIn');

    if (justLoggedIn === 'true') {
        showWelcomePopup(usuarioLogado);
        localStorage.removeItem('justLoggedIn');
    }
});

function showWelcomePopup(username) {
    const popup = document.getElementById('welcome-popup');
    const overlay = document.getElementById('popup-overlay');
    const usernameElement = document.getElementById('welcome-username');

    usernameElement.textContent = username;
    popup.style.display = 'block';
    overlay.style.display = 'block';

    setTimeout(closeWelcomePopup, 5000);
}

function closeWelcomePopup() {
    const popup = document.getElementById('welcome-popup');
    const overlay = document.getElementById('popup-overlay');

    popup.style.display = 'none';
    overlay.style.display = 'none';
}

function toggleUserDropdown(event) {
    if(event) event.stopPropagation();

    const dropdown = document.getElementById('user-dropdown');
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const usernameElement = document.getElementById('dropdown-username');

    if (usuarioLogado && dropdown) {
        usernameElement.textContent = usuarioLogado;

        const currentDisplay = window.getComputedStyle(dropdown).display;

        if (currentDisplay === 'block') {
            dropdown.style.setProperty('display', 'none', 'important');
        } else {
            dropdown.style.setProperty('display', 'block', 'important');
        }
    }
}

document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('user-dropdown');
    const userBox = document.getElementById('user-box');

    if (dropdown && userBox && !userBox.contains(event.target)) {
        dropdown.style.setProperty('display', 'none', 'important');
    }
});

document.getElementById('popup-overlay').addEventListener('click', closeWelcomePopup);