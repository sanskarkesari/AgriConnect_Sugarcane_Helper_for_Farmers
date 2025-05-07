# AgriConnect - Sugarcane Helper for Farmers

## 📌 Project Overview

A comprehensive platform designed to empower farmers with AI-powered sugarcane yield predictions, disease detection, real-time weather insights, multilingual chatbot assistance, and personalized farming guidelines. This project integrates machine learning and accessible communication tools to support decision-making and enhance agricultural productivity.

---

## 🚀 Features

* **Sugarcane Yield Prediction**: Uses historical agricultural and weather data to forecast sugarcane production.
* **Disease Detection**: Image-based detection of common sugarcane diseases using machine learning.
* **Weather & Rainfall Data**: Fetches location-based weather data using APIs for agricultural planning.
* **WhatsApp Chatbot**: Farmers can ask questions via WhatsApp in voice/text format.
* **Voice Input**: Supports local language voice queries for ease of use.
* **Multi-Language Support**: Offers language selection (e.g., Hindi/English) to enhance accessibility.
* **Farming Guidelines**: Provides climate-sensitive farming practices tailored to user location.
* **Ask Doubt Section**: Searchable Q\&A system for common queries, especially for sugarcane farming.
* **Centralized Farmer Dashboard**: Visual interface combining yield data, disease alerts, and weather conditions.

---

## 📂 Datasets Used

* Sugarcane Yield Dataset (State/Crop-wise historical data)
* Weather and Rainfall Dataset (Government and public API sources)
* Sugarcane Disease Image Dataset (Labeled image data of sugarcane plant diseases)
* Farmer interaction logs (Static/mock data for chatbot and UI)

---

## 🛠️ Tech Stack

* **Frontend**: HTML/CSS, React, Tailwind CSS 
* **Backend**: Flask, Python
* **Machine Learning**: Scikit-learn, TensorFlow (Prediction and classification models)
* **APIs**: OpenWeatherMap, Twilio (for WhatsApp)

---

## 🔄 System Architecture

1. Farmer inputs data via chatbot or dashboard.
2. Backend processes query.
3. API fetches or serves result to frontend.
4. Result shown via WhatsApp bot or dashboard UI.

---


## 🧠 Contributors

* **Abhinav Maity**: Yield prediction model, data collection, documentation
* **Sanskar Kesari**: Disease detection model, backend setup, api integration

---

## ✅ Outcomes

* Accurate sugarcane yield forecasting for informed planning.
* Disease alerts and mitigation strategies.
* Personalized, weather-based farming tips.
* Multilingual support and voice interaction to ensure inclusivity.

---

## 📌 How to Run the Project

1. Clone the repo
2. Install dependencies: `pip install -r requirements.txt`
3. Set API keys in `.env` file
4. Run backend server: `python app.py`
5. Launch frontend or open dashboard in browser
6. Connect chatbot using Twilio sandbox

---


