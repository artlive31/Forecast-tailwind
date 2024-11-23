const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// หน้าหลัก
app.get("/", (req, res) => {
    res.render("index", { weatherData: null, city: null, error: null });
});
  

// ดึงข้อมูลพยากรณ์อากาศ
app.post("/forecast", async (req, res) => {
    const { city } = req.body;
    const units = "metric";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${WEATHER_API_KEY}`;
  
    try {
      const response = await axios.get(url);
      const weatherData = response.data;
      res.render("index", { city, weatherData, error: null });
    } catch (error) {
      res.render("index", { city, weatherData: null, error: "ไม่สามารถดึงข้อมูลได้ กรุณาลองใหม่" });
    }
});
  

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
