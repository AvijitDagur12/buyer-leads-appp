This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Buyer Lead Intake App

## Description
This is a simple **Buyer Lead Intake App** designed to manage buyer leads for real estate or similar businesses. Users can register, add buyer leads, update lead status, and view lead history. The application includes both backend APIs and a simple frontend for interacting with the data.

## Tech Stack
- **Backend:** Node.js, Express, Prisma ORM  
- **Database:** SQLite  
- **Frontend:** HTML, CSS, JavaScript  
- **Other Tools:** Postman (for API testing)

## Features
1. **User Registration:** Create users to manage leads.  
2. **Add Buyer Leads:** Register buyer leads with details like name, email, phone, budget, location, and property type.  
3. **Update Lead Status:** Update lead status (NEW, CONTACTED, INTERESTED, NOT_INTERESTED).  
4. **View Lead History:** Keep track of status changes and comments for each lead.  
5. **Frontend Dashboard:** Simple interface to view leads and their status, and access lead history.

## Setup Instructions
1. Clone the repository:  
   ```bash
   git clone https://github.com/AvijitDagur12/buyer-leads-appp.git
