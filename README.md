# Fullstack To-Do List Application

A modern, responsive To-Do List web application built with React, TailwindCSS, Node.js, Express, and MongoDB.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete todos
- **Priority Levels**: Low, Medium, High priority support
- **Due Dates**: Set and track due dates with overdue indicators
- **Filtering & Sorting**: Filter by status and priority, sort by various criteria
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Real-time Updates**: Instant UI updates with optimistic rendering
- **Error Handling**: Comprehensive error handling on both frontend and backend
- **Input Validation**: Client-side and server-side validation
- **Security**: Rate limiting, CORS, and security headers

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd todo-project
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env file with your configuration
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/todo-app
# NODE_ENV=development
# FRONTEND_URL=http://localhost:3000
```

**For MongoDB Atlas (Cloud):**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string
- Replace `MONGODB_URI` in `.env` with your Atlas connection string

**For Local MongoDB:**
- Install MongoDB locally
- Ensure MongoDB service is running
- Use `mongodb://localhost:27017/todo-app` as your `MONGODB_URI`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env file with your API URL
# REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Start Backend Server

```bash
# From backend directory
npm run dev    # Development mode with nodemon (auto-restart)
# OR
npm start      # Production mode
```

The backend server will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
# From frontend directory
npm start
```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

## 📁 Project Structure

```
todo-project/
├── backend/
│   ├── controllers/
│   │   └── todoController.js      # Business logic for todos
│   ├── middleware/
│   │   ├── errorHandler.js        # Global error handling
│   │   └── validation.js          # Input validation middleware
│   ├── models/
│   │   └── Todo.js                # MongoDB schema/model
│   ├── routes/
│   │   └── todoRoutes.js          # API route definitions
│   ├── .env.example               # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js                  # Express server entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── TodoList.js        # Todo list container
    │   │   ├── TodoItem.js        # Individual todo item
    │   │   ├── TodoForm.js        # Create/Edit form modal
    │   │   ├── TodoFilter.js      # Filter and sort controls
    │   │   ├── LoadingSpinner.js  # Loading indicator
    │   │   └── ErrorMessage.js    # Error display component
    │   ├── services/
    │   │   └── api.js             # Axios API service layer
    │   ├── App.js                 # Main application component
    │   ├── index.js               # React entry point
    │   └── index.css              # TailwindCSS styles
    ├── .env.example               # Environment variables template
    ├── .gitignore
    ├── package.json
    ├── tailwind.config.js         # TailwindCSS configuration
    └── postcss.config.js          # PostCSS configuration
```

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api/todos`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos (supports query params: `completed`, `priority`, `sort`) |
| GET | `/api/todos/:id` | Get single todo by ID |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| PATCH | `/api/todos/:id/toggle` | Toggle todo completion status |
| DELETE | `/api/todos/:id` | Delete todo |

### Query Parameters

- `completed`: `true` | `false` (filter by completion status)
- `priority`: `low` | `medium` | `high` (filter by priority)
- `sort`: Sort field (e.g., `-createdAt`, `title`, `-priority`)

### Request/Response Examples

**Create Todo:**
```json
POST /api/todos
{
  "title": "Complete project",
  "description": "Finish the todo app",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Complete project",
    "description": "Finish the todo app",
    "priority": "high",
    "completed": false,
    "dueDate": "2024-12-31T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🎨 Frontend-Backend Data Flow

1. **User Action** → React component triggers an event
2. **API Service** → `todoService` method is called (in `services/api.js`)
3. **HTTP Request** → Axios sends request to Express backend
4. **Validation** → Express-validator middleware validates input
5. **Controller** → Business logic in `todoController.js`
6. **Database** → Mongoose interacts with MongoDB
7. **Response** → JSON response sent back to frontend
8. **State Update** → React state updated, UI re-renders

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Configured for specific frontend origin
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Both client-side and server-side
- **Error Handling**: No sensitive information exposed in errors

## 🧪 Testing the API

You can test the API using:

1. **Postman** or **Insomnia**
2. **curl** commands:
   ```bash
   # Get all todos
   curl http://localhost:5000/api/todos
   
   # Create todo
   curl -X POST http://localhost:5000/api/todos \
     -H "Content-Type: application/json" \
     -d '{"title":"Test Todo","priority":"high"}'
   ```

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running locally, or
- Check your MongoDB Atlas connection string
- Verify network connectivity

**Port Already in Use:**
- Change `PORT` in `.env` file
- Or kill the process using port 5000

### Frontend Issues

**API Connection Error:**
- Verify backend server is running
- Check `REACT_APP_API_URL` in `.env`
- Ensure CORS is properly configured

**Build Errors:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Edge Cases Handled

- Empty input validation
- Invalid input formats
- Network failures with user-friendly messages
- Database connection errors
- Empty state rendering
- Slow API responses with loading indicators
- Duplicate submissions prevention
- Form validation feedback

## 🚀 Production Deployment

### Backend Deployment (e.g., Heroku, Railway, Render)

1. Set environment variables in your hosting platform
2. Ensure MongoDB Atlas connection string is set
3. Deploy and verify health endpoint: `/health`

### Frontend Deployment (e.g., Vercel, Netlify)

1. Update `REACT_APP_API_URL` to production backend URL
2. Build the app: `npm run build`
3. Deploy the `build` folder

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built as a fullstack development project demonstrating modern web development practices.

---

**Happy Task Managing! 🎉**

