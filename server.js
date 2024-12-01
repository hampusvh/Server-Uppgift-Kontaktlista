const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

app.use('/api/contacts', require('./routes/contactRoutes'));

app.get('/', (req, res) => {
    res.send('Hej och välkommen');
});

const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => console.log(`Servern körs på port ${PORT}`));