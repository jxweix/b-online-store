require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.text());
app.use(cors());

const productRoutes = require('./routes/products');
const supabaseRoutes = require('./routes/supabaseClient');

app.use('/api/products', productRoutes);
app.use('/supabase', supabaseRoutes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});