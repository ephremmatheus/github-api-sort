// index.js
const axios = require('axios');

async function getGitHubUsers() {
  try {
    // Faz a requisição à API pública do GitHub
    const response = await axios.get('https://api.github.com/users');
    const users = response.data;

    // Trata os dados (pegando apenas campos úteis)
    const treatedUsers = users.map(user => ({
      id: user.id,
      login: user.login,
      url: user.html_url,
    }));

    // Aplica método de ordenação (Bubble Sort)
    const sortedUsers = bubbleSortByLogin(treatedUsers);

    // Exibe resultado
    console.log("Usuários ordenados por login:");
    console.table(sortedUsers);
    
  } catch (error) {
    console.error("Erro ao consumir API:", error.message);
  }
}

// Método de ordenação
function bubbleSortByLogin(array) {
  const arr = [...array];
  let trocou;
  do {
    trocou = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].login.toLowerCase() > arr[i + 1].login.toLowerCase()) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        trocou = true;
      }
    }
  } while (trocou);
  return arr;
}

getGitHubUsers();
