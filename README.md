# Movie API

This project is a RESTful web-service to manage movies using Node.js, Express.js та PostgreSQL.


## Setup

1. **Clone the project**:

   ```bash
   git clone https://github.com/MariaKisil/movies-api.git
   cd movie-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create `.env`** file in project root folder and add next variables:

   ```env
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=localhost
   JWT_SECRET=your_jwt_secret
   ```

## How to start the project

1. **Start PostgreSQL server**.

2. **Create database using sql syntax** (f.e., `movies_db`):

   ```sql
   CREATE DATABASE movies_db;
   ```

3. **Start server**:

   ```bash
   npm start
   ```

The server will use port http://localhost:3000/

## API usage

API supports methods:

- `POST /user/register` - register new user
- `POST /user/login` - authorize user to get JWT for further API calls
- `GET /movies` - get all movies
- `GET /movies/:id` - get movie by id ID
- `POST /movies` - create new movie (authorization is required)
- `PUT /movies/:id` - update movie by ID (authorization is required)
- `DELETE /movies/:id` - delete movie by ID (authorization is required)

## Examples

### 1. User registration

**POST /user/register**

```json
{
  "username": "exampleUser",
  "password": "examplePassword"
}
```

### 2. User login

**POST /user/login**

```json
{
  "username": "exampleUser",
  "password": "examplePassword"
}
```

Successful request will return you JWT token:

```json
{
  "token": "your_jwt_token"
}
```

### 3. Add new movie

**POST /movies** (include your JWT token into Authorization header - `Bearer {{jwt_token}}`)

```json
{
  "title": "Inception",
  "description": "A mind-bending thriller",
  "director": "Christopher Nolan",
  "releaseYear": 2010,
  "genre": "Science Fiction",
  "rating": 8.8,
  "duration": 148,
  "language": "English",
  "budget": 160000000,
  "boxOffice": 829895144
}
```

## Authorization

To access methods `POST /movies`, `PUT /movies/:id` and `DELETE /movies/:id` you have to include JWT token into request header:

```
Authorization: Bearer your_jwt_token
```
