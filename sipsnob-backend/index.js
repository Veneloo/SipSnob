import dotenv from 'dotenv';
import axios from 'axios';
import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import fetch from 'node-fetch';

dotenv.config();

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const decoded = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf8');
const serviceAccount = JSON.parse(decoded);

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

// Route: Nearby coffee shops
app.get("/api/coffee-shops", async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing latitude or longitude" });
  }

  const coffeeShops = await getCoffeeShops(lat, lng);
  await saveCoffeeShopsToFirestore(coffeeShops);
  res.json(coffeeShops);
});

// Route: Get photo by photo reference
app.get('/api/photo', async (req, res) => {
  const { ref } = req.query;
  if (!ref) return res.status(400).send("Missing photo reference");

  const googleUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${process.env.GOOGLE_API_KEY}`;

  try {
    const response = await fetch(googleUrl);
    const contentType = response.headers.get('content-type');
    res.setHeader('Content-Type', contentType);
    response.body.pipe(res); // stream directly
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch photo");
  }
});


app.get('/api/shop-details/:placeId', async (req, res) => {
  const { placeId } = req.params;

  if (!placeId) {
    return res.status(400).json({ error: "Missing placeId" });
  }

  const fields = [
    "name",
    "rating",
    "formatted_phone_number",
    "formatted_address",
    "opening_hours",
    "reviews",
    "photos",
    "geometry"
  ].join(",");

  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`;

  try {
    const response = await axios.get(detailsUrl);
    const result = response.data.result;

    if (!result) {
      return res.status(404).json({ error: "Details not found for this placeId" });
    }

    res.json(result);
  } catch (err) {
    console.error("Error fetching place details:", err.message);
    res.status(500).json({ error: "Failed to fetch place details" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
