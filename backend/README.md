# Backend — Flask API

Overview
- This is a small Flask-based REST API that provides CRUD operations for a simple contacts database (SQLite via SQLAlchemy).

Key technologies
- Python 3.10+ (or compatible)
- Flask
- Flask-SQLAlchemy
- Flask-CORS

Project structure
- `main.py` — API routes and app entrypoint.
- `config.py` — Flask app and SQLAlchemy initialization.
- `models.py` — `Contact` model and `to_json()` helper.
- `instance/` — (optional) runtime files such as the SQLite DB file.

Getting started (Windows / macOS / Linux)
1. Create a virtual environment and activate it:

   python -m venv .venv

   Windows (PowerShell):
   .\.venv\Scripts\Activate.ps1

   macOS / Linux:
   source .venv/bin/activate

2. Install dependencies:

   pip install flask flask_sqlalchemy flask_cors

3. Run the server (development):

   python main.py

   The app starts on `http://127.0.0.1:5000` by default and will create `mydatabase.db` in the project folder if it doesn't exist.

API Endpoints
- GET `/contacts` — Returns all contacts: { "contacts": [ ... ] }
- POST `/create_contact` — Create a contact. JSON body: `{ "firstName": "", "lastName": "", "email": "" }` (returns 201 on success)
- PATCH `/update_contact/<id>` — Update contact with given `id`. JSON body may include any of the three fields.
- DELETE `/delete_contact/<id>` — Delete contact with given `id`.

Examples
- Create a contact (curl):

  curl -X POST http://127.0.0.1:5000/create_contact \
    -H "Content-Type: application/json" \
    -d '{"firstName":"Jane","lastName":"Doe","email":"jane@example.com"}'

- Get contacts:

  curl http://127.0.0.1:5000/contacts

Notes & next steps
- The app uses a local SQLite DB by default. For production use, switch `SQLALCHEMY_DATABASE_URI` in `config.py` to a managed database.
- Add a `requirements.txt` file with pinned versions for repeatable installs, e.g. `pip freeze > requirements.txt` after installing packages.
- To serve in production, consider `gunicorn` or a WSGI server and disable `debug=True` in `main.py`.

Contact
- If you want, I can add a `requirements.txt` and example Dockerfile next.
