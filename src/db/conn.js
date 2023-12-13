const mongoose = require('mongoose')
require('dotenv').config();

async function main () {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(process.env.CONNECTION_STRING)
            .then(() => {
                const boneco = {
                    cabeca: '             (●̮̮̃•̃)    (●̮̮̃•̃)\n',
                    bracos: `             /█\\'unb'/█\\ \n`,
                    pernas: '              ||     /| \n',
                    logo: '     ~~~~ Universidade na Mão ~~~~\n\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n\n',
                }
                console.log('\n\n\n\n--------------- Bem Vindo ---------------\n\nv1.0\n' + boneco.cabeca + boneco.bracos + boneco.pernas + boneco.logo)
            })
            .catch((error) => {
                console.error('Erro de Conexão com Mongo: ' + error)
            })
    } catch (error) {
        console.error('Erro conn: ' + error)
    }
}

module.exports = main