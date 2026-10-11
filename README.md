email:shourikshommridho@gmail.com
password:sadnan77


# বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**

BazarDor is a responsive Bangla product-price tracking web application
that helps users explore daily prices of essential products, compare
price changes, browse products by category, and view market-wise price
information. Users can sign in or create an account to access protected
product details and manage their profile.

## 🔗 Project Links

-   **Live Website:** https://bazar-dor-ten-swart.vercel.app/
-   **GitHub Repository:**
    https://github.com/shourikhoqueshommridho/bazar-dor

## ✨ Key Features

1.  **Responsive Design:** Works across mobile, tablet, and desktop
    screens.
2.  **Live Product Price Listings:** Displays product names, units,
    current prices, and percentage changes using the BazarDor API.
3.  **Price Change Sections:** Highlights products whose prices have
    increased or decreased.
4.  **Category Filtering and Sorting:** Browse products by category and
    sort prices from low to high or high to low.
5.  **Product Details:** Shows product summaries,
    minimum/maximum/average prices, and market-wise price information
    for signed-in users.
6.  **Authentication:** Sign up and sign in with email/password, plus
    configured social login providers through Better Auth.
7.  **Profile Management:** View profile information and update the
    user's name.
8.  **Feedback and Loading States:** Toast notifications for relevant
    actions and skeleton/loading states while product data is fetched.
9.  **Friendly Error Pages:** Provides a helpful not-found page for
    invalid routes and a link back to the homepage.

## 🧰 Technologies Used

-   **Next.js** --- React framework and App Router
-   **React** --- Component-based user interface
-   **TypeScript** --- Type-safe application code
-   **Tailwind CSS** --- Styling and responsive layouts
-   **Better Auth** --- Authentication and user session management
-   **React Hot Toast** --- Success and error notifications
-   **BazarDor API** --- Product, category, and price data
-   **MongoDB** --- Database for authentication, if configured in the
    deployment
-   **Vercel** --- Deployment platform

## 🌐 API

The application uses the BazarDor API for product and category data.

**Base URL:** `https://api.abcz.workers.dev/api/bazardor`

Available endpoints:

-   `GET /products` --- Get all products
-   `GET /products?category=chal` --- Filter products by category
-   `GET /products/1` --- Get a single product
-   `GET /categories` --- Get all categories
-   `GET /categories/chal` --- Get a single category

The API host can be changed to another supported BazarDor base URL if
needed.

## 🚀 Run Locally

### Prerequisites

-   Node.js and npm
-   Git

### Installation

1.  Clone the repository:

    ``` bash
    git clone https://github.com/shourikhoqueshommridho/bazar-dor.git
    ```

2.  Open the project directory:

    ``` bash
    cd bazar-dor
    ```

3.  Install dependencies:

    ``` bash
    npm install
    ```

4.  Create a `.env.local` file in the project root and add the
    environment variables required by your local Better Auth and
    database configuration. Use your own credentials; do not commit
    secrets.

    Example variable names (match these to the names used in your
    project code):

    ``` env
    MONGODB_URI=your_mongodb_connection_string
    BETTER_AUTH_SECRET=your_long_random_secret
    BETTER_AUTH_URL=http://localhost:3000
    ```

    Add any provider-specific credentials used by your configuration,
    such as GitHub or Google OAuth credentials, if those providers are
    enabled.

5.  Start the development server:

    ``` bash
    npm run dev
    ```

6.  Visit <http://localhost:3000> in your browser.

## 🏗️ Build for Production

Run the production build:

``` bash
npm run build
```

Start the production server locally:

``` bash
npm run start
```

## 🔐 Authentication and Deployment Notes

-   Configure the production environment variables in your hosting
    provider.
-   Set the Better Auth base URL to the deployed website's canonical
    URL.
-   Register the correct callback/redirect URLs in each enabled social
    login provider.
-   Ensure the MongoDB connection string and Better Auth secret are
    configured correctly.
-   After changing environment variables, redeploy the application.
-   Never publish database credentials, OAuth client secrets, or other
    private keys in the repository.

## 📌 Disclaimer

Product prices are indicative and may change depending on market
conditions. Please verify prices with the relevant local market before
making purchasing decisions.
