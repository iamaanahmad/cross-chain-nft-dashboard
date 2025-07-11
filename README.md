
# 🚀 Cross-Chain NFT Dashboard
![App Preview](https://i.ibb.co/cSt58Tvx/image.png)
<br/>
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-blue?logo=tailwindcss&logoColor=white)
![Gemini API](https://img.shields.io/badge/Google_Gemini-API-orange?logo=google)
![License](https://img.shields.io/badge/License-MIT-green)

> The ultimate command center for NFT collectors and traders. Aggregate, analyze, and track your favorite collections across Ethereum, Solana, and Polygon with a lightning-fast, AI-supercharged interface.

<br/>

```
  +-------------------------------------------------------------+
  | 🖼️ Cross-Chain NFT Dashboard                                |
  +-------------------------------------------------------------+
  | [Search collections...]        [🌀 Refresh] [Export ▾]      |
  |                                                             |
  | +----------+   +----------+   +----------+   +----------+   |
  | |Ξ         |   |🔮        |   |ZED       |   |BAYC      |   |
  | |CryptoPunks|  |Degen Apes|   |RUN       |   |          |   |
  | |          |   |          |   |          |   |          |   |
  | +----------+   +----------+   +----------+   +----------+   |
  | | ETH 45.5 |   | SOL 60.2 |   | MATIC 0.1|   | ETH 88.0 |   |
  | +----------+   +----------+   +----------+   +----------+   |
  +-------------------------------------------------------------+
```
_A glimpse of the dashboard's clean, aggregated view._

---

## ✨ Killer Features

*   **💎 Cross-Chain Dominance**: Unify your portfolio view across **Ethereum**, **Solana**, and **Polygon**. No more tab-switching chaos.
*   **🧠 Gemini-Powered AI Insights**: Get instant, savvy market analysis for any collection. Is it mooning or is it a dud? The AI knows.
*   **📊 Rich Trait Analytics**: Visualize trait rarity and distribution with interactive charts. Spot the rare gems before anyone else.
*   **⚡ Real-Time Feel**: A "Refresh" button fetches the latest floor prices, simulating a live market feed.
*   **🔍 Universal Search**: Instantly find any collection with a fast, responsive search bar.
*   **📤 Instant Data Export**: Download your filtered data to **CSV** or **JSON** for deeper, off-chain analysis or reporting.
*   **📱 Sleek & Responsive**: A stunning, modern UI that looks and feels great on any device, from a 4K monitor to your phone.

## 🛠️ Tech Stack & Architecture

This project is built on a **"zero-build" philosophy**. It leverages modern browser features to run without any bundlers like Webpack or Vite. This means faster setup, easier debugging, and a lightweight development experience.

*   **Framework**: [React 19](https://react.dev/) for building a component-based UI.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) for robust, type-safe code.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via CDN) for rapid, utility-first styling.
*   **AI**: [Google Gemini API](https://ai.google.dev/) (`@google/genai`) for generating market analysis.
*   **Charting**: [Recharts](https://recharts.org/) for beautiful and interactive data visualizations.
*   **Module System**: Native **ES Modules** with an `importmap` in `index.html`. This is the magic that eliminates the need for a build step!

## 🚀 Getting Started

### Prerequisites

1.  A modern web browser (e.g., Chrome, Firefox, Edge).
2.  A local web server.
3.  A **Google Gemini API Key**.

### 1. Clone the Repo

```bash
git clone https://github.com/iamaanahmad/cross-chain-nft-dashboard.git
cd cross-chain-nft-dashboard
```

### 2. Configure API Key

The application needs a Google Gemini API key to power its AI analysis feature.

It is designed to source this key from the `process.env.API_KEY` environment variable. You must ensure this variable is available in the execution environment where you serve the application. Many modern hosting platforms (like Vercel, Netlify) and development tools allow you to set environment variables.

**Note**: The AI features will be gracefully disabled if the API key is not found.

### 3. Run the App

Because the app uses ES Modules, you need to serve it from a local server (you can't just open `index.html` from the file system).

The easiest way is to use the **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)** extension for Visual Studio Code. Simply right-click on `index.html` and select "Open with Live Server".

Alternatively, you can use a simple command-line server:
```bash
# If you have Python 3
python -m http.server

# Or if you have Node.js
npx serve .
```
Then, open your browser and navigate to `http://localhost:8000` (or the port your server provides).

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features or improvements, feel free to open an issue or submit a pull request.

1.  **Fork** the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a **Pull Request**.

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
