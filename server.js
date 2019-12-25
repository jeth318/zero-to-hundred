const express = require('express')
const app = express()
const port = process.env.PORT || 3001

app.use(express.static('dist'))

app.get('/', (req, res) => res.sendFile('./dist/index.html'));
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`))