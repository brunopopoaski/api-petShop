import app from "./app.js";
import env from "./config/env.js";
import connect from "./config/db.js";

//função para iniciar o servidor e conectar com o banco de dados
(async () => {
  try {
    await connect(env.URL_MONGODB);
    app.listen(env.PORT, () => console.log(`API ouvindo em http://localhost:${env.PORT}`));
  } catch (error) {
    console.error('Erro ao conectar no banco ou iniciar o servidor', error);
  }
})();