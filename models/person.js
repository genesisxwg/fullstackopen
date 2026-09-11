const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('conectando a', url)

mongoose.connect(url)
  .then(() => {
    console.log('conectado exitosamente a MongoDB')
  })
  .catch((error) => {
    console.log('error conectando a MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function(v) {
        // Expresión regular: 2 o 3 dígitos, guion y el resto dígitos
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} no es un número de teléfono válido. Debe tener el formato XX-XXXXXXX o XXX-XXXXXXX.`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)