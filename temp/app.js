/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const fs = require('fs');

const app = express();

const PORT = 3000;
// const { Sequelize } = require('sequelize');
const userRouter = require('./src/routes/routes');
const userlistRouter = require('./src/routes/userRoutes');

const authMiddleware = require('./src/middlewares/auth.middleware');

// const Connection = require('./src/utils/connection.util');

// Connection.createSequelize();
// const sequelize = Connection.getSequelize();

// const sequelize = new Sequelize('test', 'postgres', 'NewPassword', {
//   host: 'localhost',
//   dialect: 'postgres',
// });

// sequelize.authenticate().then(() => {
//   console.log('Connection has been established successfully.');

//   sequelize.sync().then(() => {
//     console.log('Tables created...');
//   }).catch((err) => {
//     console.error(err);
//   });
// }).catch((error) => {
//   console.error('Unable to connect to the database: ', error);
// });

app.use(express.json());

// create user.json if not cerated
if (!fs.existsSync('users.json')) {
  fs.writeFileSync('users.json', '[]');
}

app.use((req, res, next) => {
  authMiddleware(req, res, next);
});
app.use('/', userRouter);
app.use('/user', userlistRouter);

// eslint-disable-next-line no-console
app.listen(PORT, console.log(`server running at port ${PORT}`));

// module.exports = sequelize;
