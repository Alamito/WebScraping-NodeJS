const axios = require('axios');
const fs = require('fs');   // biblioteca de FileSystem do NodeJS

const URL = "https://jc.ne10.uol.com.br/blogs/torcedor/2022/11/15117681-tabela-da-copa-do-mundo-2022-completa-veja-quando-comeca-quando-termina-e-todos-os-jogos-da-copa-do-mundo-do-catar.html"

const writeToFile = (data, fileName) => {

    const promiseCallback = (resolve, reject) => {
        fs.writeFile(fileName, data, (error) => {
            if (!error) {
                resolve(true);
            } else {
                reject(error);
            }
        });
    }
    return new Promise(promiseCallback);
}

const readFromFile = (fileName) => {
    const promiseCallback = (resolve) => { 
        fs.readFile(fileName, 'utf8', (error, contents) => {
            if (error) {
                resolve(null);
                return;
            }
            resolve(contents);
        });
    }

    return new Promise(promiseCallback);
};

const getPage = () => {
    return axios.get(URL)
        .then((response) => response.data); 
};

const getCachedPage = () => {
    const fileName = "cache/World Cup 2022.html";

    const promiseCallback = async (resolve, reject) => {

        const cachedHTML = await readFromFile(fileName);

        if (!cachedHTML) { 
            const html = await getPage();
            writeToFile(html, fileName);
            resolve(html);
            return;
        }
        resolve(cachedHTML);
    };

    return new Promise(promiseCallback);
};

/* CASO DESSE ERROR, A SOLUCAO PODERIA SER COLOCAR OS HEADERS*/
getCachedPage()
    .catch(console.error)