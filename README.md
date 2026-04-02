# Library System API

A simple Node.js + Express + MongoDB REST API for managing a library system, including authors, students, attendants, and books. Supports borrowing and returning books, with validation, pagination, and search features.

---

## Setup Instructions

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment variables**
   - Create a `.env` file in the root of `library-system/` with:
     ```env
     MONGODB_URI=mongodb://localhost:27017/Library_system
     PORT=4004
     ```
4. **Start the server**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:4004/`

---

## .env Variables

| Variable      | Description                        |
|--------------|------------------------------------|
| MONGODB_URI  | MongoDB connection string          |
| PORT         | Port for the Express server        |

---

## API Endpoints

### Authors
- **GET /authors** — List all authors
- **GET /authors/:id** — Get author by ID
- **POST /authors** — Create author
  - Body: `{ "name": "John Doe", "bio": "Writer" }`
- **PUT /authors/:id** — Update author
  - Body: `{ "name": "Jane Doe", "bio": "Updated bio" }`
- **DELETE /authors/:id** — Delete author

### Students
- **GET /students** — List all students
- **GET /students/:id** — Get student by ID
- **POST /students** — Create student
  - Body: `{ "name": "Alice", "email": "alice@email.com", "studentId": "S123" }`
- **PUT /students/:id** — Update student
  - Body: `{ "name": "Alice B.", "email": "aliceb@email.com", "studentId": "S123" }`
- **DELETE /students/:id** — Delete student

### Attendants
- **GET /attendants** — List all attendants
- **GET /attendants/:id** — Get attendant by ID
- **POST /attendants** — Create attendant
  - Body: `{ "name": "Bob", "staffId": "A001" }`
- **PUT /attendants/:id** — Update attendant
  - Body: `{ "name": "Bob B.", "staffId": "A001" }`
- **DELETE /attendants/:id** — Delete attendant

### Books
- **GET /books** — List all books (supports pagination and search)
  - Query params: `?page=1&limit=10&title=xyz&author=abc`
  - Example response:
    ```json
    {
      "page": 1,
      "limit": 10,
      "total": 2,
      "books": [
        {
          "_id": "...",
          "title": "Book Title",
          "isbn": "1234567890",
          "authors": [ { "_id": "...", "name": "Author Name" } ],
          "status": "IN",
          ...
        }
      ]
    }
    ```
- **GET /books/:id** — Get book by ID
- **POST /books** — Create book
  - Body: `{ "title": "Book Title", "isbn": "1234567890", "authors": ["authorId"] }`
- **PUT /books/:id** — Update book
  - Body: `{ "title": "New Title", ... }`
- **DELETE /books/:id** — Delete book
- **POST /books/:id/borrow** — Borrow a book
  - Body: `{ "studentId": "...", "attendantId": "...", "returnDate": "2026-05-01" }`
  - Example response:
    ```json
    {
      "_id": "...",
      "title": "Book Title",
      "status": "OUT",
      "borrowedBy": { "_id": "...", "name": "Student Name" },
      "issuedBy": { "_id": "...", "name": "Attendant Name" },
      "returnDate": "2026-05-01T00:00:00.000Z",
      ...
    }
    ```
- **POST /books/:id/return** — Return a book
  - Example response:
    ```json
    {
      "_id": "...",
      "title": "Book Title",
      "status": "IN",
      "borrowedBy": null,
      "issuedBy": null,
      "returnDate": null,
      ...
    }
    ```

---

## Error Handling
- All endpoints return JSON errors with a clear message and appropriate HTTP status code.
- Duplicate ISBNs return: `{ "error": "A book with this ISBN already exists." }`
- Validation errors return: `{ "error": "Missing fields: ..." }`

---

## License
MIT
