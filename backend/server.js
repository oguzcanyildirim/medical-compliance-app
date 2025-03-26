const express = require('express');
const cors = require('cors');
const denklikRoutes = require('./routes/denklik');

const app = express();

const allowedOrigins = [
  'http://localhost:4200',
  'https://medical-compliance-app-1.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json({ type: 'application/json' }));  // UTF-8 çözümleme için

app.use('/api', denklikRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend http://localhost:${PORT} üzerinden çalışıyor`);
});
