const app = require('./src/app');

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`BusinessFlow API running on http://localhost:${PORT}`);
});