# Coupon Generator Project

This project is a web application that generates unique coupons with QR codes. Each coupon can have points, and users can set an expiration date for them. The project is built using Next.js 14+ with TypeScript and is connected to a PostgreSQL database. The app allows you to generate, search, and manage coupons in a simple interface.

## Features
- Generate unique alphanumeric coupon codes (case-sensitive).
- Generate QR codes for each coupon.
- Set points and expiration date for each coupon.
- Display a list of coupons with pagination and search functionality.
- Ability to delete coupons.

## Tech Stack
- **Frontend**: Next.js 14+, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **QR Code Generation**: Using a library for QR code creation
- **Docker**: Optional for running PostgreSQL in a container

## Prerequisites
- Node.js (v16+) or Bun
- PostgreSQL
- Docker (optional for database setup)
- Prisma (for database schema management)

## 1. Clone the repository


```bash
  git clone https://github.com/UncleJoseph-Jr/coupone-generator.git
  cd coupon-generator
```

## 2. Install dependencies

Install the required dependencies using npm or bun:

```bash
  npm install
```
or
```bash
  bun install
```

## 3. Set up environment variables

Create a `.env` file in the root of the project with the following content. Replace the `DATABASE_URL` with your PostgreSQL connection string:

```bash
  DATABASE_URL="postgresql://postgres:admin1234@localhost:5432/coupon_db"
``` 
## 4. Set up the database
Use Prisma to generate the database schema. First, migrate your database:
```bash
npx prisma migrate dev --name init
```
## 5. Run the development server
Now you can run the development server:
```bash
npm run dev
```
or
```bash
bun dev
```
This command will start the app at `http://localhost:3000.`

## 6. Generate QR codes and coupons
To create coupons, you can navigate to the coupon creation page and fill in the required details (points, quantity, and expiration days). Coupons will be displayed with their QR codes in the list.

## 7. Manage coupons
You can view the list of coupons, delete any coupon, or search for specific coupons by code. Pagination is implemented, showing 20 coupons per page.

## API Endpoints
### 1. Create Coupons
- Endpoint: `/api/createcoupons`
- Method: `GET`
- Fetch all available coupons from the database.

## Project Structure
```
src/
├── pages/
│   ├── api/
│   │   ├── createcoupons.ts  # API for creating coupons
│   │   ├── fetchcoupons.ts   # API for fetching coupons
│   │   └── deletecoupon.ts   # API for deleting a coupon
│   ├── couponslist.tsx       # Frontend for displaying the list of coupons
│   └── ...
└── prisma/
    └── schema.prisma         # Database schema

```
### Database Schema (Prisma)
Here is the Prisma schema for the coupons:
```
model Coupon {
  id             String   @id @default(uuid())
  code           String   @unique
  points         Int
  expirationDate DateTime
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

```
### Using Docker (Optional)
If you'd prefer to use Docker for your database, you can use the following steps:
1. Make sure Docker is installed.
2. Create a `docker-compose.yml` file to run PostgreSQL in a container:
```
version: '3.8'
services:
  db:
    image: postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: admin1234
      POSTGRES_DB: coupon_db
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:

```
3. Start the PostgreSQL container:
```
docker-compose up -d
```
4. Update your .env file with the connection string for Docker:
```
DATABASE_URL="postgresql://postgres:admin1234@db:5432/coupon_db"
```
Now you can run the application with the Docker-managed PostgreSQL database.


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Support

For support, email unclejoseph.jr@gmail.com. 

BTC: bc1qf4yu2yeftx6g3s26wr5ll75yvmwwnghchdae4p

ETH: 0xc44Cd28402bA4Ce5aE2F1f2A79FD3DB67f1d234d

DOGE: DF88mNgaUFLAnSqYARrCiuJBbLiQL3bZug

LTC: ltc1q5qw50p8epntkyfkw0n06rvx8pcc9pdyer7ep8z