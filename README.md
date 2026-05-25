# 🌌 Hunter Leveling System

An immersive leveling tracker and companion app based on the legendary Hunter universe, built with **React**, **Vite**, **Capacitor**, **Supabase**, and powered by **Gemini AI**.

---

## 🚀 Features

- **Dynamic Leveling Tracking**: Track your hunter rank, stats, and abilities.
- **AI-Powered Companion**: Powered by Gemini AI to guide you through your hunter journey.
- **Cross-Platform**: Run as a modern web app or natively on **iOS** and **Android** using **Capacitor**.
- **Real-time Sync**: Synced globally using Supabase database.

---

## 🛠️ Prerequisites

Before you start, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- **For iOS**: Xcode and CocoaPods (macOS only)
- **For Android**: Android Studio and Android SDK

---

## ⚡ Quick Start

### 1. Clone & Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create or update the `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> [!NOTE]
> A default `.env` with demo values is already provided in the repository to help you get started quickly!

### 3. Run the Web Application

```bash
npm run dev
```

---

## 📱 Mobile Deployment

This project uses **Capacitor** to compile to native iOS and Android applications.

### Build and Sync Web Assets

Every time you make changes to the React frontend, build the project and sync it to the native platforms:

```bash
# 1. Build the production web assets
npm run build

# 2. Sync assets and plugins to iOS & Android
npx cap sync
```

### Launch on iOS 🍏

To launch the app in an iOS Simulator:

```bash
npx cap run ios
```

Or open the native project in Xcode to run on a physical device:

```bash
npx cap open ios
```

### Launch on Android 🤖

To launch the app in an Android Emulator / Device:

```bash
npx cap run android
```

Or open the native project in Android Studio:

```bash
npx cap open android
```