# TikTok Clone

A TikTok-like social media application built using Next.js, React, and Sanity as the backend.

## Features
- Video uploading and sharing
- User authentication (Google login)
- Like and comment functionality
- Copy video link to clipboard
- Infinite scrolling with `nice-react-ticker`
- State management using Zustand

## Tech Stack
- **Frontend:** Next.js, React, TailwindCSS
- **Backend:** Sanity.io (headless CMS)
- **Authentication:** Google OAuth
- **State Management:** Zustand
- **Utilities:** Axios, React Icons, React Hot Toast
- **File Handling:** Multer

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (>=14)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/tiktok-clone.git
   cd tiktok-clone
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open `http://localhost:3000` in your browser.

## Scripts
- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run start` - Runs the application in production mode
- `npm run lint` - Runs ESLint checks

## Environment Variables
Create a `.env.local` file and add the required environment variables:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the MIT License.

