const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const apiRoutes = require("./routes/apiRoutes");
const clientRoutes = require("./routes/clientRoutes");

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);
app.use("/", clientRoutes);


// LISTENER
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});