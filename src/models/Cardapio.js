const mongoose = require('mongoose')

const { Schema } = mongoose

const cardapioSchema = new Schema({
    titulo: {
        type: String,
        required: true,
    },
    cardapio: {
        type: Object,
        required: true,
    },
    }
)

const Cardapio = mongoose.model('Cardapio', cardapioSchema)


module.exports = {
    Cardapio,
    cardapioSchema,
}