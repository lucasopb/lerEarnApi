import 'dotenv/config'; // precisa vir antes de tudo
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import categoryRouter from './routes/categoryRoutes';
import authorRouter from './routes/authorRoutes'
import userRouter from './routes/userRoutes'
import { AppDataSource } from './config/dataSource';
import bookRouter from './routes/bookRoutes'
import { swaggerSpec } from './config/swagger';

const app = express();
app.use(express.json());

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/categories', categoryRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);
app.use('/auth', userRouter)

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Conexão com o banco de dados estabelecida com sucesso!")
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar com o banco de dados:", error);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n🚀 Servidor iniciado com sucesso!');
  console.log('----------------------------------------');
  console.log(`📚 Documentação Swagger disponível em:`);
  console.log(`🔗 http://localhost:${PORT}/api-docs`);
  console.log('----------------------------------------\n');
});
