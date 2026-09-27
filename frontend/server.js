const path = require('node:path');
const express = require('express');

const app = express();
app.use(express.static(path.join(__dirname)));

app.listen(8080, () => {
  console.log('Frontend SportHub disponibile su http://localhost:8080');
});
