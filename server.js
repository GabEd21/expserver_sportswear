var admin = require("firebase-admin");

var serviceAccount = require("./sportswear-a7c5e-firebase-adminsdk-6i4zx-5e632cac5e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
const cors = require('cors');
const items = db.collection(`items`)
const cart = db.collection(`cart`)


// server.js
const express = require('express');
const app = express();
const port = 2000; 

app.use('/images', express.static('images'));

app.use(
    cors({
        origin: true,
        credential: true,
        optionSuccessStatus: 200
    })
)

app.use(express.json());

app.post('/cart/add', async (req, res) => {
  try {
      const newItem = req.body;
      await cart.add(newItem);
      res.status(201).send('Item added to cart successfully');
  } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).send('Error adding item to cart');
  }
});

// Route to get items in the cart
app.get('/cart', async (req, res) => {
  try {
      const cartSnapshot = await cart.get();
      const cartItems = cartSnapshot.docs.map(doc => doc.data());
      res.json(cartItems);
  } catch (error) {
      console.error('Error getting cart items:', error);
      res.status(500).send('Error getting cart items');
  }
});

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