const puppeteer = require('puppeteer');
const { Cardapio: CardapioModel } = require("../models/Cardapio");
const { set } = require('mongoose');

const scrappingController = {
    getCardapio: async (_req, res) => {
        res.status(200).json({ message: "Bem Vindo ao UnB na Mão" });
    },
    scrapePDFLinks: async (_req, res) => {
        const browser = await puppeteer.launch(); // Rodar em modo headless
        const page = await browser.newPage();
        try {
            await page.goto('https://ru.unb.br/index.php/cardapio-refeitorio');
            // Esperar por um seletor específico na página
            await page.waitForSelector('#content'); // Aguarde até que o elemento com ID 'content' esteja disponível
            const pdfLinks = await page.evaluate(() => {
                // Encontrar todos os links dentro do elemento com ID 'content'
                const links = Array.from(document.querySelectorAll('#content a[href$=".pdf"]')); // Seleciona todos os links que terminam com '.pdf'
                // Extrair os links dos elementos e retornar como um array
                const hrefs = links.map(link => link.href);
                return hrefs;
            });

            // Filtro para remover links duplicados
            const linksUnicos = pdfLinks.filter((link, index, self) => {
                return index === self.indexOf(link);
            });

            const cardapio = {
                darcy: '',
                ceilandia: '',
                gama: '',
                planaltina: '',
                fazenda: ''
            }

            linksUnicos.forEach(element => {
                if(element.includes('/Darcy')){
                    cardapio.darcy = element;
                } else if(element.includes('/Ceilandia')){
                    cardapio.ceilandia = element;
                } else if(element.includes('/Gama')){
                    cardapio.gama = element;
                } else if(element.includes('/Planaltina')){
                    cardapio.planaltina = element;
                } else if(element.includes('/Fazenda')){
                    cardapio.fazenda = element;
                }
            })

            console.log(JSON.stringify(cardapio));
            const response = await CardapioModel.create({ titulo: 'Atualizado em: ' + new Date().toString(), cardapio: cardapio });
            res.status(201).json({ response, message: "Cardápio atualizado com sucesso!" });

        } catch (error) {
            res.status(500).json({ error, message: "Erro ao atualizar o cardápio" });
            console.error('Ocorreu um erro:', error);
        } finally {
            await browser.close();
        }
    }
};

module.exports = scrappingController;
