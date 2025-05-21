import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import createClient from "openapi-fetch";

const api = createClient({
  baseUrl: "http://localhost:3001",
});

function App() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmitPlainFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formData,
    });
  };

  const handleSubmitUsingRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const request = new Request("http://localhost:3001/upload", {
      method: "POST",
      body: formData,
    });

    await fetch(request);
  };

  const handleSubmitOpenApiFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await api.POST("/upload", {
      body: formData,
    });
  };
  return (
    <div className="container">
      <h1>File Upload Test</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleSubmitPlainFetch}>Upload with plain fetch</button>
      <button onClick={handleSubmitUsingRequest}>
        Upload with new Request
      </button>
      <button onClick={handleSubmitOpenApiFetch}>
        Upload with openapi-fetch
      </button>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
