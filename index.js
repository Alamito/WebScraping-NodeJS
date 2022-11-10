const axios = require('axios');
const fs = require('fs');   // biblioteca de FileSystem do NodeJS
const cheerio = require('cheerio');
const { info } = require('console');

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

    const promiseCallback = async (resolve) => {

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

const getPageItems = (html) => {

    const $ = cheerio.load(html);

    const promiseCallback = (resolve, reject) => {
        const selectorTitle = '#textContentCount > h3:nth-child(n+9)';
        const selectorGames = '#textContentCount > ul:nth-child(n+10) > li:nth-child(n+1)'
        const info = {
            Titles: [],
            Day: [],
            Games: [],
        }

        info.Titles = getPageText($, '#textContentCount > h3:nth-child(n+9)');
        info.Day = getPageText($, '#textContentCount > h4:nth-child(n+17)');
        info.Games = getPageText($, '#textContentCount > ul');

        // writeToFile(info.Title[0], 'SaveFiles/teste.txt');

        console.log(info.Day);
        
        resolve(true);
    }

    return new Promise(promiseCallback);
}

const getPageText = ($, selector) => {
    const arr = [];
    $(selector).each(function (i, element) { 
        const a = $(element);
        const text = a.text();

        arr[i] = text;
    })

    return arr;
}


/* CASO DESSE ERROR, A SOLUCAO PODERIA SER COLOCAR OS HEADERS*/
getCachedPage()
    .then(getPageItems)
    .catch(console.error)