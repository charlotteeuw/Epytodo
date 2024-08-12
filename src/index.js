const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authMiddleware = require('./middleware/auth');
const notFoundMiddleware = require('./middleware/notFound');
const authRoutes = require('./routes/auth/auth');
const todosRoutes = require('./routes/todos/todos');
const userRoutes = require('./routes/user/user');

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(authRoutes);

app.use(authMiddleware);

app.use(todosRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
