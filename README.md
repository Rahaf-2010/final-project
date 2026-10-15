🚗 Issa Automobile

A Modern Full-Stack Web Application for Vehicle Listings, Sales Requests, and Customer Reviews

📌 Project Overview

Issa Automobile is a full-stack web application designed for an automobile dealership. The platform allows visitors to browse available vehicles, explore detailed vehicle information, and interact with the dealership through a modern web interface.

Registered users can submit and manage vehicle sales requests and publish customer reviews. Administrators have access to a protected administration panel where they can manage vehicle listings, sales requests, and customer reviews.

The main objective of this project is to digitize essential automobile dealership operations through a structured, user-friendly, and maintainable web application.

✨ Key Features

🚘 Vehicle Listings and Management

* Display available vehicles in an organized catalog.
* View detailed information about individual vehicles.
* Display vehicle specifications, descriptions, prices, and images.
* Create, update, and delete vehicle listings through administrative functionality.

👤 User Authentication and Authorization

* User registration and login.
* Password hashing using bcryptjs.
* Token-based authentication using JSON Web Tokens (JWT).
* Role-based access control for regular users and administrators.
* Protected routes for authorized operations.

📩 Vehicle Sales Requests

* Submit requests to sell a vehicle.
* View and manage personal sales requests.
* Update or delete eligible requests.
* Allow administrators to review requests and manage their statuses.

⭐ Customer Reviews

* Display customer reviews.
* Allow authenticated users to submit reviews.
* Edit or delete personal reviews.
* Manage reviews through the administration panel.
* Allow administrators to respond to customer reviews.

🛠️ Administration Panel

* Manage vehicle listings.
* Review and manage sales requests.
* Moderate customer reviews.
* Access administrative dashboard functionality.
* Restrict administrative operations to authorized users.

🖼️ Image Uploads

* Upload vehicle and request images using Multer.
* Store uploaded files in the configured upload directory.
* Serve uploaded files through the backend.

🧰 Technology Stack

Technology	Purpose
React:	Building the user interface
Vite:	Development server and production build tooling
React Router:	Client-side navigation
Axios:	HTTP communication with the backend
Lucide React:	Icons and user interface elements
Node.js:	JavaScript runtime for the backend
Express.js:	REST API and server-side routing
MongoDB:	NoSQL database
Mongoose:	Database schemas and data operations
JSON Web Token (JWT):	Token-based authentication
bcryptjs:	Password hashing
Multer:	File upload handling
Nodemon:	Automatic backend restarts during development
Concurrently:	Running multiple development processes
Docker:	Application containerization
Nginx:	Frontend serving and web server configuration

🏗️ Project Architecture

The application follows a client-server architecture divided into two main components.

Frontend: Responsible for rendering the user interface, handling navigation, displaying data, and managing user interactions.

Backend: Responsible for business logic, REST API endpoints, authentication, authorization, file uploads, and database operations.

The frontend communicates with the backend through HTTP requests. The backend processes incoming requests and interacts with MongoDB when data needs to be retrieved, created, updated, or deleted.

Project Structure

final-project/
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── icons.svg
│   │   └── issa-hero.png
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   │
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Footer.css
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   │
│   │   ├── pages/
│   │   │   ├── AboutUs.jsx
│   │   │   ├── AboutUs.css
│   │   │   ├── AdminCars.jsx
│   │   │   ├── AdminCars.css
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminDashboard.css
│   │   │   ├── AdminReviews.jsx
│   │   │   ├── AdminReviews.css
│   │   │   ├── AdminSellRequest.jsx
│   │   │   ├── AdminSellRequest.css
│   │   │   ├── CarDetails.jsx
│   │   │   ├── CarDetails.css
│   │   │   ├── Cars.jsx
│   │   │   ├── Cars.css
│   │   │   ├── Home.jsx
│   │   │   ├── Home.css
│   │   │   ├── Login.jsx
│   │   │   ├── Login.css
│   │   │   ├── MeineAnfragen.jsx
│   │   │   ├── MeineAnfragen.css
│   │   │   ├── Register.jsx
│   │   │   ├── Register.css
│   │   │   ├── SellRequest.jsx
│   │   │   └── SellRequest.css
│   │   │
│   │   ├── services/
│   │   │  └── api.js
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .dockerignore
│   ├── .gitignore
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── nginx.conf
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── carController.js
│   │   ├── reviewController.js
│   │   └── sellRequestController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── Car.js
│   │   ├── Review.js
│   │   ├── SellRequest.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── carRoutes.js
│   │   ├── reviewRoutes.js
│   │   └── sellRequestRoutes.js
│   │
│   ├── uploads/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── compose.yaml
├── package.json
├── package-lock.json
└── README.md

Directory Description

* frontend/src/components/: Reusable user interface components.
* frontend/src/pages/: Application pages and administrative views.
* frontend/src/services/: API communication and HTTP client configuration.
* backend/config/: Database and application configuration.
* backend/controllers/: Business logic for handling requests.
* backend/middleware/: Authentication, authorization, and upload middleware.
* backend/models/: Mongoose data models.
* backend/routes/: REST API route definitions.
* backend/uploads/: Directory for uploaded files.

⚙️ Prerequisites

Before running the application, make sure the following software is installed:

* Node.js
* npm
* MongoDB
* Docker and Docker Compose (optional)

Verify your installation:

node --version
npm --version

🚀 Installation and Setup

1. Navigate to the Project Directory

cd final-project

2. Install Dependencies

Install the root dependencies:

npm install

Install the frontend dependencies:

cd frontend
npm install

Install the backend dependencies:

cd ../backend
npm install
cd ..

3. Configure Environment Variables

Create a local backend environment file from the provided example.

On macOS or Linux:

cp backend/.env.example backend/.env

On Windows PowerShell:

Copy-Item backend/.env.example backend/.env

Configure the values in backend/.env according to your local environment.

Example:

PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/issa_automobile
JWT_SECRET=replace_with_a_long_random_secret
ADMIN_EMAIL=admin@example.com

Replace the example JWT secret with a long, randomly generated secret. Configure the administrator email according to the application’s actual authorization implementation.

Important: Never commit real credentials, database passwords, or JWT secrets to a public repository.

4. Start MongoDB

Make sure MongoDB is running and accessible using the connection string specified in MONGODB_URI.

The example connection string uses a local MongoDB instance.

5. Configure the Frontend

Create a file named frontend/.env with the following content:

VITE_API_URL=http://localhost:5000/api

This setting allows the frontend to communicate with the locally running backend API.

6. Run the Application

From the project root directory, execute:

npm run dev

The root development script starts the frontend and backend concurrently.

With the default local configuration, the application can be accessed at:

* Frontend: http://localhost:5173
* Backend: http://localhost:5000
* API Status: http://localhost:5000/api/status

The actual ports may vary depending on the project configuration and port availability.

🖥️ Application Pages

Public Pages

Route	Description
/	Home page
/cars	Vehicle catalog
/cars/:id	Vehicle details
/about-us	About the company
/login	User login
/register	User registration

User Pages

Route	Description
/sell-request	Submit a vehicle sales request
/meine-anfragen	View and manage personal requests

Administration Pages

Route	Description
/admin	Administration dashboard
/admin/cars	Vehicle management
/admin/sell-requests	Sales request management
/admin/reviews	Customer review management

The exact functionality and access permissions of each page depend on the implementation of the frontend routes and backend authorization middleware.

🔌 REST API Documentation

The backend exposes REST API endpoints for authentication, vehicle management, sales requests, and customer reviews.

The default API base URL is:

http://localhost:5000/api

Authentication

Method	Endpoint	Description
POST	/auth/register	Register a new user
POST	/auth/login	Authenticate a user

Vehicles

Method	Endpoint	Description
GET	/cars	Retrieve available vehicles
GET	/cars/:id	Retrieve a specific vehicle
POST	/cars	Create a vehicle listing
PUT	/cars/:id	Update a vehicle listing
DELETE	/cars/:id	Delete a vehicle listing

Sales Requests

Method	Endpoint	Description
POST	/sell-requests	Create a sales request
GET	/sell-requests	Retrieve personal requests
PUT	/sell-requests/:id	Update a personal request
DELETE	/sell-requests/:id	Delete a personal request
GET	/sell-requests/admin	Retrieve all requests for administration
PUT	/sell-requests/admin/:id/status	Update a request status
DELETE	/sell-requests/admin/:id	Delete a request administratively

Customer Reviews

Method	Endpoint	Description
GET	/reviews	Retrieve customer reviews
POST	/reviews	Create a review
PUT	/reviews/:id	Update a personal review
DELETE	/reviews/:id	Delete a personal review
GET	/reviews/admin	Retrieve reviews for administration
DELETE	/reviews/admin/:id	Delete a review administratively
PUT	/reviews/admin/:id/reply	Add or update an administrative reply
DELETE	/reviews/admin/:id/reply	Remove an administrative reply

Administration

Method	Endpoint	Description
GET	/admin/dashboard	Retrieve administration dashboard data
GET	/status	Check API availability

Note: Protected endpoints require valid authentication and, where applicable, administrator permissions. The precise request formats, HTTP methods, and authorization requirements are defined in the backend route and middleware implementations.

🗄️ Database and Data Models

The application uses MongoDB for data persistence and Mongoose for schema definition and database operations.

User Model

The user model stores account information, contact details, authentication data, and user roles.

Passwords should be stored only as secure hashes, never as plain text.

Car Model

The car model stores vehicle listing information, including attributes such as brand, model, manufacturing year, mileage, price, description, color, and image paths.

Sales Request Model

Sales requests are stored in a dedicated model. This allows the application to manage submitted requests independently from vehicle listings and associate requests with the relevant users.

Review Model

Customer reviews are stored separately and managed according to the permissions implemented for regular users and administrators.

The exact fields, validation rules, and relationships are defined in the corresponding Mongoose model files.

🔐 Security Considerations

The application incorporates several security-related mechanisms:

* Password hashing using bcryptjs.
* Token-based authentication using JWT.
* Role-based access control.
* Middleware for protecting administrative endpoints.
* Separation of public and protected operations.
* Environment variables for sensitive configuration.

Before production deployment, additional checks should cover input validation, upload file type and size restrictions, rate limiting, CORS configuration, secure token storage, and centralized error handling.

Client-side route protection alone is not sufficient. Authorization must be enforced by the backend for every protected API endpoint.

🐳 Docker Deployment

The project includes Dockerfiles for the frontend and backend, along with a Docker Compose configuration.

Before starting the containers, ensure that the required environment variables are configured and that MongoDB is accessible from the containers.

Build and start the application:

docker compose up --build

Stop the containers:

docker compose down

The published ports and database connection settings depend on the configuration in compose.yaml.

For production deployments, configure persistent storage, secure secrets, network access, and uploaded file storage appropriately.

🧪 Code Quality and Testing

The frontend provides commands for linting and building the application:

cd frontend
npm run lint
npm run build

* Linting: Checks the frontend source code for selected quality and style issues.
* Production build: Generates the optimized frontend build.

Automated tests should be added for authentication, API endpoints, authorization rules, file uploads, and essential user workflows. Tests should be run regularly to reduce regressions and improve reliability.

🛠️ Troubleshooting

MongoDB Connection Errors

* Verify that MongoDB is running.
* Check the MONGODB_URI value.
* Ensure that the database server is reachable from the backend.
* Review the backend logs for connection errors.

Frontend Cannot Reach the API

* Verify that the backend is running.
* Check the VITE_API_URL setting.
* Inspect browser developer tools for network and CORS errors.

Images Are Not Displayed

* Verify that uploaded files exist in the configured upload directory.
* Check the stored image paths.
* Ensure that the backend serves uploaded files correctly.

Administration Features Are Unavailable

* Verify that the logged-in user has the required role.
* Check the authentication token and login flow.
* Confirm that the backend enforces the appropriate permissions.

🚀 Future Improvements

Potential future enhancements include:

* Advanced vehicle search, filtering, and sorting.
* Pagination for large datasets.
* Additional automated tests.
* Improved form validation and error messages.
* Enhanced logging and monitoring.
* Improved image storage and upload validation.
* Continuous integration and deployment workflows.
* Accessibility and responsive design improvements.
* Additional API examples and application screenshots.

📄 License

The project’s license information is defined in the root package.json. Before publishing or distributing the application, verify that the specified license is appropriate for all project components and dependencies.

👨‍💻 Conclusion

Issa Automobile combines a React-based frontend, an Express REST API, and a MongoDB database to support core automobile dealership operations.

The application provides functionality for vehicle listings, user accounts, sales requests, customer reviews, and administrative management.

Its modular architecture provides a foundation for further development, testing, and maintenance.

⸻

Issa Automobile — Bringing vehicle listings, customer requests, and dealership management together in one web application.