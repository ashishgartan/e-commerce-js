🔐 Authentication
POST /api/auth/signup – Register a new user
POST /api/auth/login – Login existing user
POST /api/auth/logout – Logout user

👤 Users
GET /api/users – Get all users
GET /api/users/:id – Get user by ID
PATCH /api/users/:id – Update user by ID
DELETE /api/users/:id – Delete user by ID

🛒 Cart
GET /api/cart/:userId – Get user cart
POST /api/cart/:userId – Replace user cart
PATCH /api/cart/:userId/add – Add product to cart
PATCH /api/cart/:userId/remove/:productId – Remove product from cart

🛍️ Products
GET /api/products – Get all products
POST /api/products – Add new product
GET /api/products/id/:id – Get product by ID
PATCH /api/products/:id – Update product by ID
DELETE /api/products/:id – Delete product by ID
GET /api/products/search?q=... – Search products
GET /api/products/sort?sort=price_asc – Sort products
GET /api/products/pagination?page=1&limit=10 – Paginate products
GET /api/products/price/:from/:to – Filter products by price range
GET /api/products/pagination/category/:category?page=1&limit=10 – Paginate by category

🧾 Categories
GET /api/categories – Get all categories
POST /api/categories – Add new category
GET /api/categories/:id – Get category by ID
PATCH /api/categories/:id – Update category
DELETE /api/categories/:id – Delete category
