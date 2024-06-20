import express from "express";
import { __dirname } from "./src/path.js";
import hbs from "./src/handlebarsHbs.js";


import viewsRouter from './src/routes/views.routes.js';
import cartRouter from './src/routes/carts.routes.js';
import productsRouter from './src/routes/products.routes.js';
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { initMongoDB }  from './src/db/mongoDb.js';




const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));


app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);

app.engine('handlebars', hbs.engine);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

app.use(errorHandler);

initMongoDB();

const PORT = 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));