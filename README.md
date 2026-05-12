<div align="center">

# 🧱 Tiles Gallery

> **Discover Your Perfect Aesthetic.** <br />
> A beautifully crafted, premium tile gallery web application featuring seamless authentication, a curated collection browser, and artisan tile details.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://next-auth.js.org/)

**[🔗 View Live Application](https://tilesgallery-sigma.vercel.app/)** • **[🐛 Report Bug](https://github.com/Atahar-Shihab/B13-A08-TilesGallery_Atahar-Shihab/issues)** • **[✨ Request Feature](https://github.com/Atahar-Shihab/B13-A08-TilesGallery_Atahar-Shihab/issues)**

</div>

---

## ✨ Key Features

*   **Premium Homepage:** Immersive hero banner, smooth animated marquee, and a dynamic showcase of top featured tiles.
*   **Comprehensive Gallery:** Advanced search by title, material, or tag. Filter by category and sort by price or name to find the exact aesthetic you need.
*   **Artisan Details:** Dedicated pages for each tile featuring high-resolution imagery, specifications, tags, and creator information.
*   **Seamless Authentication:** Secure login and registration using Email/Password or 1-click **Google OAuth**, powered by NextAuth.js.
*   **User Profiles:** Personalized dashboards to view user data, update display names, and change profile photos with live previews.
*   **Protected Routes:** Rock-solid middleware securing private routes (details and profiles) from unauthenticated access.
*   **Polished UI/UX:** Fully responsive design across all devices, sleek skeleton loaders, toast notifications for instant feedback, and a custom interactive SwiperJS carousel.

---

## 🛠️ Tech Stack & Packages

### Core Architecture
*   **Framework:** Next.js 15 (App Router)
*   **Styling:** Tailwind CSS (Minimalist & Clean spacing)
*   **Database:** MongoDB native driver & Mongoose
*   **Data Server:** JSON Server (Mock REST API)

### Key Dependencies
| Package | Purpose |
| :--- | :--- |
| `next-auth` | Secure authentication (Credentials + Google) |
| `@auth/mongodb-adapter` | Seamless DB integration for NextAuth |
| `bcryptjs` | Cryptographic password hashing |
| `swiper` | Touch-enabled slider/carousel |
| `react-fast-marquee` | Smooth infinite scrolling elements |
| `react-hot-toast` | Elegant non-blocking notifications |
| `lucide-react` | Crisp, modern iconography |

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites
*   Node.js 18+
*   MongoDB Atlas cluster (or local instance)
*   Google Cloud Console account (for OAuth credentials)

### Installation

**1. Clone the repository**
```bash
git clone [https://github.com/Atahar-Shihab/B13-A08-TilesGallery_Atahar-Shihab.git](https://github.com/Atahar-Shihab/B13-A08-TilesGallery_Atahar-Shihab.git)
cd tiles-gallery
```

**2. Install dependencies**
```bash
npm install --legacy-peer-deps
```

**3. Configure Environment Variables**
Create a `.env.local` file in the root directory and add your keys:
```env
# Database
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/tiles-gallery

# NextAuth
NEXTAUTH_SECRET=your_super_secret_key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Local API
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**4. Spin up the Development Environment**
You will need two terminal windows running simultaneously:

```bash
# Terminal 1: Start the JSON data server
npm run server

# Terminal 2: Start the Next.js frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 🚦 Route Permissions

Security and routing are handled efficiently via Next.js App Router and NextAuth middleware.

| Route | Access Level | Description |
| :--- | :--- | :--- |
| `/` | 🟢 **Public** | Landing page and hero showcase |
| `/all-tiles` | 🟢 **Public** | Main searchable gallery |
| `/login` | 🟢 **Public** | Authentication portal |
| `/register` | 🟢 **Public** | Account creation |
| `/tile/[id]` | 🔴 **Private** | Detailed specifications and creator info |
| `/my-profile` | 🔴 **Private** | User dashboard |
| `/my-profile/update` | 🔴 **Private** | Account settings and image updates |

---

## 📁 Architecture Structure

```text
tiles-gallery/
├── app/
│   ├── (auth)/             # Login & Registration flows
│   ├── all-tiles/          # Gallery grid, search & filters
│   ├── api/                # NextAuth, Registration, and Update endpoints
│   ├── my-profile/         # Protected user dashboards
│   ├── tile/[id]/          # Dynamic routing for individual tiles
│   ├── layout.jsx          # Root layout (Navbar & Footer)
│   ├── not-found.jsx       # Custom 404 error page
│   └── page.jsx            # Landing page
├── components/             # Reusable UI (Navbar, Footer, TileCards, Skeletons)
├── data/                   # JSON Server mock database
├── lib/                    # NextAuth config & MongoDB connection instances
└── middleware.js           # Route protection logic
```

---



## 👨‍💻 Author

**Atahar Shihab**
*   **GitHub:** [@Atahar-Shihab](https://github.com/Atahar-Shihab)
*   **Email:** shihabatahar@gmail.com

---

## 📝 License

© 2026 Tiles Gallery. All Rights Reserved.