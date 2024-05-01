var admin = require("firebase-admin");

var serviceAccount = require("./sportswear-a7c5e-firebase-adminsdk-6i4zx-5e632cac5e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
const cors = require('cors');
const items = db.collection(`items`)


// server.js
const express = require('express');
const app = express();
const port = 2000; // Choose any port you prefer

app.use('/images', express.static('images'));

app.use(
    cors({
        origin: true,
        credential: true,
        optionSuccessStatus: 200
    })
)

app.use(express.json());

// Define routes
app.get('/', async (req, res) => {
    const itemSnapshot = await items.get();
    const itemList = itemSnapshot.docs.map(doc => doc.data());
    res.json(itemList)
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});