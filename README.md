# 🏠 KaRaSaRa Home Tiffin — Home Tiffin Service for Students

> Bringing Amma's home-cooked meals to hostel & PG students living away from home 🍱❤️

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![JSX](https://img.shields.io/badge/Built%20With-JSX-FF6B35?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)

---

## 📌 About

**KaRaSaRa Home Tiffin** is a home tiffin service web app built specifically for **hostel and PG students** who miss authentic home-cooked food. Students can subscribe to weekly fixed meal plans, choose from traditional Karnataka dishes, and even order extra meals for their parents back home — all through a beautifully designed single-file React app.

---

## ✨ Features

- 🔐 **Login / Signup** — Order only after authentication
- 📅 **Weekly Meal Plans** — Fixed menu Mon–Sun (2 sets to choose from)
- 🍱 **42+ Menu Items** — Breakfast, Lunch, Dinner, Evening Snacks & Fresh Fruits
- 💝 **Order for Parents** — Separate delivery to family back home
- 🛒 **Cart System** — Add, remove, update quantities in real time
- 📧 **Email Confirmation** — Auto-sent on every order via Claude API
- 📱 **Fully Responsive** — Works on mobile, tablet and desktop
- 🎨 **Attractive UI** — Animated hero, floating cards, gradient themes

---

## 🍽️ Menu Categories

| Category | Items | Timings |
|---|---|---|
| 🌅 Breakfast | Set Dosa, Akki Rotti, Masala Dosa, Upma, Pongal... | 7 AM – 11 AM |
| ☀️ Lunch | Pulav, Bisi Bele Bath, Menthe Rice, Corn Rice, Sambar Rice... | 12 PM – 3 PM |
| 🌙 Dinner | Jolada Rotti, Chapati, Koli Rotti, Ragi Mudde, Paratha... | 7 PM – 10 PM |
| 🌆 Evening Snacks | Goli Baje, Pav Bhaji, Egg Bonda, Potato Bonda, Mirchi Bajji... | 4 PM – 7 PM |
| 🍎 Fresh Fruits | Seasonal Platter, Mango Cup, Berry Bowl, Tropical Mix... | All Day |

---

## 📅 Weekly Meal Plan

Two different sets designed for students:

### Set 1 — Classic Homestyle (₹1,200 / week)
Traditional Karnataka meals with a fixed rotating schedule.

### Set 2 — Premium Variety (₹1,400 / week)
Premium items including non-veg options and special dishes.

> Both sets include **Lunch + Dinner for 7 days (14 meals/week)**

**Special:** Students can add an extra order for their parents at a separate address — order one day in advance.

---

## 🚀 Getting Started

### Option 1 — Use directly in Claude.ai

1. Open [claude.ai](https://claude.ai)
2. Paste the contents of `tiffin-service.jsx`
3. Ask Claude to render it as an artifact
4. The full app runs instantly in your browser

### Option 2 — Create React App

```bash
# Create a new React project
npx create-react-app karasara-home-tiffin
cd karasara-home-tiffin

# Replace the default App.js with tiffin-service.jsx
cp tiffin-service.jsx src/App.jsx

# Install required icon package
npm install lucide-react

# Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Option 3 — Vite (Faster)

```bash
npm create vite@latest karasara-home-tiffin -- --template react
cd karasara-home-tiffin
npm install
npm install lucide-react

# Replace src/App.jsx with tiffin-service.jsx content
npm run dev
```

---

## 📁 Project Structure

```
karasara-home-tiffin/
│
├── tiffin-service.jsx      # 🔥 Entire app in one file
│
├── src/
│   └── App.jsx             # Entry point (paste JSX here)
│
└── README.md
```

> This is intentionally a **single-file** React app. All components, styles, data, and logic live inside `tiffin-service.jsx`.

---

## 🧩 Components Inside JSX

| Component | Description |
|---|---|
| `Navigation` | Sticky top nav with cart badge and user menu |
| `HomePage` | Hero, features, category cards, fruits section, testimonials |
| `LoginPage` | Login and signup with form validation |
| `MenuPage` | Filterable menu grid with all 42+ items |
| `WeeklyPlanPage` | Set selector, 7-day schedule, subscription form |
| `CartSidebar` | Slide-in cart with delivery details |
| `ConfirmationPage` | Order success with email confirmation |
| `Footer` | Contact info and hours |

---

## 🎨 Design Highlights

- **Color Theme:** Warm orange `#FF6B35` + golden `#F7931E`
- **Fruits Section:** Green gradient `#d1fae5` with bounce animations
- **Hero:** Floating food circles with CSS keyframe animations
- **Cards:** Smooth hover lift with box-shadow transitions
- **Font:** Poppins (via system font stack)
- **Layout:** CSS Grid + Flexbox, fully responsive

---

## 📧 Email Confirmation (Claude API)

When an order is placed, a confirmation email is automatically generated using the **Anthropic Claude API** with:

- Order ID and item list
- Delivery address and time
- Service description and contact info
- Weekly subscription details (if applicable)

> **Note:** The email feature requires the app to run inside the Claude.ai environment where the API is accessible.

---

## 💰 Pricing

| Plan | Price | Includes |
|---|---|---|
| Classic Homestyle | ₹1,200 / week | Lunch + Dinner, Mon–Sun |
| Premium Variety | ₹1,400 / week | Lunch + Dinner, Mon–Sun |
| Individual Order | From ₹45 | Single item ordering |

---

## 🙋 Who Is This For?

- 🎓 **Hostel students** missing home food
- 🏢 **PG residents** tired of mess food
- 👨‍💼 **Working professionals** wanting home-cooked meals
- 👨‍👩‍👦 **Parents** who want to feed their children remotely

---

## 🗺️ Roadmap

- [ ] Payment gateway integration (Razorpay / UPI)
- [ ] Real-time order tracking
- [ ] Push notifications
- [ ] Admin dashboard for kitchen management
- [ ] Review and rating system
- [ ] Pause/resume subscription feature

---

## 📞 Contact

| Channel | Details |
|---|---|
| 📞 Phone | +91 98765 43210 |
| 📧 Email | support@karasara.com |
| 🕐 Hours | Monday – Sunday, 7 AM – 10 PM |
| 📍 Location | Bengaluru, Karnataka |

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---

<p align="center">Made with ❤️ for students missing Amma's cooking</p>
