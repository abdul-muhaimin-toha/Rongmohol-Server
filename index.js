const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Rongmohol server is running!');
});

app.listen(port, () => {
  console.log(`Rongmohol server is listening on port ${port}`);
});
