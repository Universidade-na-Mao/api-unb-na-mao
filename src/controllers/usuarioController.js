const bcrypt = require('bcrypt');
const { Usuario: UsuarioModel } = require("../models/Usuario");


const usuarioController = {
  create: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.senha, salt);
      const usuario = {
        nome: req.body.nome,
        matricula: req.body.matricula,
        senha: hashedPassword,
        telefone: req.body.telefone,
        email: req.body.email,
        user_image: 'https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png',
        role: req.body.role == 'Estudante' ? req.body.role : req.body.role + ' - Aguardando Aprovação',
      };
      
      console.log(req.body);
      const response = await UsuarioModel.create(usuario);
    
      res
        .status(201)
        .json({ response, message: "Usuário registrado com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "Login, Email ou Telefone já cadastrado no sistema" });
      console.log("Erro controller usuario\n" + error);
    }  
  },
  validaUsuario: async (req, res) => {
    try {
      const usuario = await UsuarioModel.findOne({ matricula: req.body.matricula });
      if (usuario && await bcrypt.compare(req.body.senha, usuario.senha)) {
        const usuarioNovo = {
          nome: usuario.nome,
          matricula: usuario.matricula,
          telefone: usuario.telefone,
          user_image: usuario.user_image,
          role: usuario.role
        }
        res.status(201).json({
          message: "Bem Vindo ao UnB na Mão",
          response: usuarioNovo
      });
      } else {
        res.status(200).json({
          message: "Credenciais não encontradas no sistema.",
        })
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro na requisição com o banco." });
      console.log(error);
    }
  },
  atualizaDadosUsuario: async (req, res) => {
    try {
      const { matricula } = req.body;

      // Verifica se a matrícula foi fornecida na solicitação
      if (!matricula) {
        return res.status(400).json({ message: "Matrícula não fornecida." });
      }

      const updates = {
        nome: req.body.nome,
        telefone: req.body.telefone,
        user_image: req.body.user_image,
      };

      // Procura o usuário pela matrícula no banco de dados
      const usuario = await UsuarioModel.findOne({ matricula });

      // Se o usuário for encontrado
      if (usuario) {
        // Atualiza apenas os campos permitidos
        usuario.nome = updates.nome || usuario.nome;
        usuario.telefone = updates.telefone || usuario.telefone;
        usuario.user_image = updates.user_image || usuario.user_image;

        await usuario.save();
        res.status(200).json({ message: "Dados do usuário atualizados com sucesso." });
      } else {
        // Se o usuário não for encontrado
        res.status(404).json({ message: "Usuário não encontrado." });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar dados do usuário.", error: error.message });
      console.error("Erro ao atualizar dados do usuário:", error);
    }
  },



};

module.exports = usuarioController;