const mongoose = require('mongoose');
const { stringify } = require('querystring');
//bcrypt -> criptografia
const bcrypt = require('bcrypt');
const DataShema = new mongoose.Schema({
  nome_usuario: String,
  email_usuario: String,
  tipo_usuario: { type: Number, default: 1 },
  senha_usuario: String,
}, {
  timestamps: true
});
//Criptografar a senha
DataShema.pre('save', function (next) {
  if (!this.isModified("senha_usuario")) {
    return next();
  }
  this.senha_usuario = bcrypt.hashSync(this.senha_usuario, 10);
  next();
});

const usuarios = mongoose.model('Usuarios', DataShema);
module.exports = usuarios;