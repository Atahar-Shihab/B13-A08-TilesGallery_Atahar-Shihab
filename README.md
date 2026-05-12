# 🧱 Tiles Gallery

A beautifully crafted tile gallery web application built with Next.js, featuring authentication, a curated collection browser, and artisan tile details.

🔗 **Live URL:** [https://tiles-gallery.vercel.app](https://tiles-gallery.vercel.app)

---

## ✨ Key Features

- **Home Page** — Hero banner with "Discover Your Perfect Aesthetic", animated marquee, and top 4 featured tiles
- **All Tiles Gallery** — Search by title/material/tag, filter by category, sort by price/name
- **Tile Details** — Full details page with high-res image, specs, tags, and creator info (private route)
- **Authentication** — Email/password login & registration + Google OAuth via NextAuth.js
- **My Profile** — View logged-in user data with avatar display
- **Update Profile** — Update name and profile photo URL with live preview
- **Responsive Design** — Fully responsive on mobile, tablet, and desktop
- **Protected Routes** — Tile details and profile require authentication
- **Loading States** — Skeleton loaders on data fetching
- **Custom 404** — Beautiful not-found page
- **Toast Notifications** — Success/error feedback throughout the app
- **SwiperJS Integration** — Used for tile showcase carousel

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js v4
- **Database:** MongoDB (via @auth/mongodb-adapter)
- **Data Server:** JSON Server
- **Fonts:** Cormorant Garamond, DM Sans, DM Mono (Google Fonts)

---

## 📦 npm Packages Used

| Package | Purpose |
|---|---|
| `next-auth` | Authentication (credentials + Google OAuth) |
| `@auth/mongodb-adapter` | MongoDB adapter for NextAuth |
| `mongodb` | MongoDB native driver |
| `mongoose` | MongoDB ODM |
| `bcryptjs` | Password hashing |
| `react-hot-toast` | Toast notifications |
| `react-fast-marquee` | Animated scrolling marquee |
| `swiper` | Touch slider/carousel (Challenge requirement) |
| `lucide-react` | Icons |
| `json-server` | Mock REST API for tile data |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Google OAuth credentials (for Google login)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tiles-gallery.git
cd tiles-gallery

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your credentials
```

### Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/tiles-gallery
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_API_URL=https://tiles-gallery-server-2.onrender.com/tiles
```

### Running the App

```bash
# Terminal 1: Start the JSON server (tile data)
npm run server

# Terminal 2: Start the Next.js dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
tiles-gallery/
├── app/
│   ├── (auth)/
│   │   ├── login/          # Login page
│   │   └── register/       # Registration page
│   ├── all-tiles/          # Tile gallery with search & filter
│   ├── tile/[id]/          # Single tile detail (private)
│   ├── my-profile/
│   │   ├── page.jsx        # Profile view (private)
│   │   └── update/         # Update name & photo (private)
│   ├── api/
│   │   ├── auth/           # NextAuth handler
│   │   ├── register/       # User registration endpoint
│   │   └── update-profile/ # Profile update endpoint
│   ├── layout.jsx          # Root layout with Navbar, Footer
│   ├── page.jsx            # Home page
│   └── not-found.jsx       # Custom 404 page
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── TileCard.jsx
│   └── LoadingSkeleton.jsx
├── lib/
│   ├── auth.js             # NextAuth configuration
│   └── mongodb.js          # MongoDB connection
├── data/
│   └── db.json             # JSON Server database
├── middleware.js            # Route protection
└── .env.local               # Environment variables
```

---

## 🚦 Route Permissions

| Route | Access |
|---|---|
| `/` | Public |
| `/all-tiles` | Public |
| `/login` | Public |
| `/register` | Public |
| `/tile/[id]` | **Private** (requires login) |
| `/my-profile` | **Private** (requires login) |
| `/my-profile/update` | **Private** (requires login) |

---

## 📸 Screenshots


---

## 🔧 Deployment

Deploy to Vercel:

```bash
vercel deploy
```


---

## 📝 License

© 2026 Tiles Gallery
