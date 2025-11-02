# Proud Kenya MVP

A Next.js application for tracking Kenya's national achievements and progress, starting with Uasin Gishu county.

## Features

- **National Overview**: High-level KPIs and interactive county map
- **County Pages**: Detailed county summaries with constituencies
- **Ward Pages**: Local achievements, submissions, and discussions
- **Paid Magazine**: Pay-per-article opinion pieces
- **PWA**: Installable mobile app with offline capabilities
- **Admin Console**: Moderation and verification tools

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Firebase (Firestore, Auth, Storage)
- **PWA**: Next-PWA for service worker and manifest
- **Payments**: M-Pesa integration (planned)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd proud-kenya
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Firebase**

   - Create a Firebase project
   - Enable Firestore, Authentication, and Storage
   - Copy your Firebase config to `lib/firebase.js`

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Project Structure

```
proud-kenya/
├── components/          # Reusable React components
│   ├── Layout/         # Header, Footer
│   ├── Map/            # Interactive map
│   ├── Card/           # AchievementCard, etc.
│   ├── Widgets/        # FeaturedPosts, AchievementsFeed
│   ├── County/         # County-specific components
│   ├── Ward/           # Ward-specific components
│   └── ...
├── pages/              # Next.js pages
│   ├── index.js        # Homepage
│   ├── county/[slug].js # County pages
│   ├── ward/[id].js    # Ward pages
│   └── ...
├── public/             # Static assets
│   ├── icons/          # PWA icons
│   └── manifest.json   # PWA manifest
├── styles/             # Global styles
└── lib/                # Firebase config (to be added)
```

## Firebase Schema

Key collections:

- `achievements`: User-submitted achievements
- `posts`: Paid opinion pieces
- `users`: User profiles
- `payments`: Transaction records
- `counties`, `constituencies`, `wards`: Geographic data

## Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Deploy to Vercel** (recommended for Next.js)
   - Connect your GitHub repo to Vercel
   - Add Firebase environment variables
   - Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
