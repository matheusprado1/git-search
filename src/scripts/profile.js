// Quando a página carrega, recupera os dados do perfil do localStorage
window.onload = async () => {
  const profileData = JSON.parse(localStorage.getItem("profileData"));

  // Faz uma requisição para a API do GitHub para obter os repositórios do usuário
  const response = await fetch(`https://api.github.com/users/${profileData.login}/repos`);
  const reposData = await response.json();

  // Cria a página do perfil com os dados do perfil e dos repositórios
  createProfilePage(profileData, reposData);
}

const createProfilePage = (profileData, reposData) => {
  // Seleciona os elementos do DOM
  const profileImage = document.querySelector(".profile__image");
  const profileUsername = document.querySelector(".profile__username");
  const profileUl = document.querySelector(".profile__ul");

  // Atualiza os dados do perfil
  profileImage.src = profileData.avatar_url;
  profileUsername.textContent = profileData.name;

  // Limpa a lista de repositórios
  profileUl.innerHTML = "";

  // Cria e adiciona os novos elementos da lista de repositórios
  reposData.forEach(repo => {
    const li = document.createElement("li");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    const a = document.createElement("a");

    h4.textContent = repo.name;
    p.textContent = repo.description;
    a.href = repo.html_url;
    a.target = "_blank";
    a.textContent = "Repositório";

    li.appendChild(h4);
    li.appendChild(p);
    li.appendChild(a);

    profileUl.appendChild(li);
  });
};

const changeUserButton = document.querySelector(".profile__change-user--button");

changeUserButton.addEventListener("click", () => {
  window.location.href = "/../../index.html"
})