const express       = require('express');
const cors          = require('cors');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const consign       = require('consign');
const auth          = require('./middlewares/auth');

require('dotenv').config();

const url = process.env.MONGO_URL || 'mongodb://admin:abc123@ds335957.mlab.com:35957/heroku_1sh8s53r';

require('./config/db')(url);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).json('API USUARIOS GITHUB');
});


require('./routes/LoginRoute')(app);

app.use(auth);

consign()
    .include('routes')
    .into(app);


app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));