const searchProfile = async () => {
  const user = document.querySelector("#inputUser").value;

  try {
    const response = await fetch(`https://api.github.com/users/${user}`);

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    const profileData = await response.json();

    // Salva os dados do usuário no localStorage
    localStorage.setItem("profileData", JSON.stringify(profileData));

    // Redireciona para a página de perfil se a requisição for bem-sucedida
    window.location.href = "src/pages/profile.html";
  } catch (error) {
    console.log(error);

    // Redireciona para a página de erro se a requisição falhar
    window.location.href = "src/pages/error.html";
  }
}

const indexButton = document.querySelector(".index__button");

indexButton.addEventListener("click", event => {
  event.preventDefault();
  searchProfile();
});

const form = document.querySelector("form");

form.addEventListener("submit", event => {
  event.preventDefault();
  searchProfile();
});

