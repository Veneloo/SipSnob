require("dotenv").config();
const axios = require("axios");
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

async function getCoffeeShops(latitude, longitude) {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=cafe&key=${API_KEY}`;

    try {
        const response = await axios.get(url);
        return response.data.results; // Returns an array of coffee shops
    } catch (error) {
        console.error("Error fetching coffee shop data:", error);
        return [];
    }
}

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function saveCoffeeShopsToFirestore(coffeeShops) {
    const batch = db.batch(); // Batch write for efficiency

    coffeeShops.forEach(shop => {
        const shopRef = db.collection("coffee_shops").doc(shop.place_id);
        batch.set(shopRef, {
            name: shop.name || "Unknown",
            address: shop.vicinity || "No Address",
            rating: shop.rating || 0, // Default to 0 if no rating exists
            location: {
                lat: shop.geometry.location.lat,
                lng: shop.geometry.location.lng
            },
            place_id: shop.place_id
        });
    });

    await batch.commit(); // Commit all changes
    console.log("Coffee shops saved to Firestore.");
}

async function fetchAndStoreCoffeeShops(latitude, longitude) {
    const coffeeShops = await getCoffeeShops(latitude, longitude);
    await saveCoffeeShopsToFirestore(coffeeShops);
}

// Example: Fetch and store coffee shops near New York City
fetchAndStoreCoffeeShops(40.7128, -74.0060);