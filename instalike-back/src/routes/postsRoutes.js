import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem,atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin:"http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos para o Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os uploads (no caso, 'uploads/')
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo como o nome original
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ storage });

// Função que define as rotas da aplicação
const routes = (app) => {
  // Habilita o parser JSON para o Express processar requests com body JSON
  app.use(express.json());
  app.use(cors(corsOptions));
  // Rota GET para buscar todos os posts
  // (A lógica para buscar os posts está definida no arquivo postsController.js)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post
  // (A lógica para criar um novo post está definida no arquivo postsController.js)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem
  // Utiliza o middleware 'upload.single("imagem")' para processar o upload
  // e chama a função 'uploadImagem' (definida no postsController.js) para tratar o upload
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

export default routes;