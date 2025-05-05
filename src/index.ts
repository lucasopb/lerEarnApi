import 'dotenv/config'; // precisa vir antes de tudo
import express from 'express';
import categoryRouter from './routes/categoryRoutes';
import authorRouter from './routes/authorRoutes'
import { AppDataSource } from './config/dataSource';

const app = express();
app.use(express.json());

app.use('/category', categoryRouter);
app.use('/author', authorRouter)

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Conexão com o banco de dados estabelecida com sucesso!")
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar com o banco de dados:", error);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
