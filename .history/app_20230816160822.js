const path = require('path');
const express = require('express');

const authRoutes = require('./routes/auth.routes');

const app = express();

app.set('viewengine', 'ejs');
app.set()

app.use(authRoutes);

app.listen(3000);