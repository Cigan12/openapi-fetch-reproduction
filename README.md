# openapi-fetch Content-Length Issue Reproduction

This repository demonstrates an issue where `openapi-fetch` sends a `Content-Length` header that is twice as large as expected for file uploads, compared to using plain fetch.

## Reproduction Steps

1.  **Clone the repository:**

2.  **Install dependencies and run the project:**

    ```bash
    pnpm install
    pnpm dev
    ```

3.  **Access the UI:**
    Open your browser to `http://localhost:5173` (or the port indicated by Vite).

4.  **Upload and test:**

    - Select a file using the file input.
    - Open your backend console (where `pnpm dev` is running).
    - Click each of the three buttons:
      - "Upload with plain fetch"
      - "Upload with new Request"
      - "Upload with openapi-fetch"

5.  **Observe the `Content-Length`:**
    In the backend console, you will observe the `Content-Length` header logged for each upload. The `Content-Length` for "Upload with plain fetch" will be approximately half the size of the `Content-Length` for "Upload with new Request" and "Upload with openapi-fetch". This highlights the unexpected larger `Content-Length` sent when `new Request` (used internally by `openapi-fetch`) is involved in file uploads.
