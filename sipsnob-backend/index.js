require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const admin = require("firebase-admin");

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

async function getCoffeeShops(latitude, longitude) {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=cafe&key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching coffee shop data:", error);
    return [];
  }
}

async function saveCoffeeShopsToFirestore(coffeeShops) {
  const batch = db.batch();
  coffeeShops.forEach((shop) => {
    const shopRef = db.collection("coffee_shops").doc(shop.place_id);
    batch.set(shopRef, {
      name: shop.name || "Unknown",
      address: shop.vicinity || "No Address",
      rating: shop.rating || 0,
      location: {
        lat: shop.geometry.location.lat,
        lng: shop.geometry.location.lng,
      },
      place_id: shop.place_id,
    });
  });
  await batch.commit();
}

app.get("/api/coffee-shops", async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing latitude or longitude" });
  }

  const coffeeShops = await getCoffeeShops(lat, lng);
  await saveCoffeeShopsToFirestore(coffeeShops);
  res.json(coffeeShops);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
