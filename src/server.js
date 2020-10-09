const express = require("express");
const app = express();

const port = process.env.PORT || 3768;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
