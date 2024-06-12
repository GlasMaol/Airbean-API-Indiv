import express from 'express';
import menuRouter from './routes/menu.js';
import addProductRouter from './routes/addProduct.js';
import nedb from 'nedb-promises';
import registerRouter from './routes/register.js';
import loginRouter from './routes/login.js';
import updateUserRouter from './routes/update.js';
import cartRouter from './routes/cart.js';
import errorHandlerMiddleware from './middlewares/errorHandler.js'
import orderRouter from './routes/order.js';
import info from './routes/info.js';
import confirmationRouter from './routes/confirmation.js';
import logger from './middlewares/logger.js';
import orderHistoryRouter from './routes/orderhistory.js';
import updateProductRouter from './routes/updateProduct.js';
import deleteProductRouter from './routes/deleteProduct.js';
import offerRouter from './routes/offer.js';


const app = express();
const PORT = process.env.PORT || 8080;

//console.log("Testing server.js exports");
export const database = nedb.create({ filename: 'users.db', autoload: true });
export const db = nedb.create({ filename: 'cart.db', autoload: true });
export const orderDB = nedb.create({ filename: 'order.db', autoload: true });
export const orderNumberDB = nedb.create({ filename: 'orderNumber.db', autoload: true });
export const menuDB = nedb.create({ filename: 'menu.db', autoload: true });
//console.log('menuDB is defined as:', menuDB);
export const offerDB = nedb.create({ filename: 'offer.db', autoload: true })


app.use(express.json());
app.use(logger); // Global logger middleware

app.use('/menu', menuRouter);
app.use('/addproduct', addProductRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/update-account', updateUserRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/info', info);
app.use('/confirmation', confirmationRouter);
app.use('/order-history', orderHistoryRouter);
app.use('/updateproduct', updateProductRouter);
app.use('/deleteproduct', deleteProductRouter);
app.use('/offer', offerRouter);

app.use(errorHandlerMiddleware);

// Starta server
app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
});
