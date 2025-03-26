const express = require('express');
const cors = require('cors');
const denklikRoutes = require('./routes/denklik');

const app = express();
app.use(cors());
app.use(express.json({ type: 'application/json' }));  // UTF-8 çözümleme için

app.use('/api', denklikRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend http://localhost:${PORT} üzerinden çalışıyor`);
});
