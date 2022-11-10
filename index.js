const axios = require('axios');

const URL = "https://jc.ne10.uol.com.br/blogs/torcedor/2022/11/15117681-tabela-da-copa-do-mundo-2022-completa-veja-quando-comeca-quando-termina-e-todos-os-jogos-da-copa-do-mundo-do-catar.html"

const getPage = () => {
    console.log('*** getPage');

    return axios.get(URL).then((response) => response.data); 
};

/* CASO DESSE ERROR, A SOLUCAO PODERIA SER COLOCAR OS HEADERS*/
getPage()
    .then(console.log)
    .catch(console.error)