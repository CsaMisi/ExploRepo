import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RepositoryList from './components/RepoList';
import RepositoryDetail from './components/RepoDetail';
import { createRoot } from 'react-dom/client';
import './index.css';
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found");
}
const root = createRoot(rootElement);

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-6">
            <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
              SzSzEA ExploRepo
            </Link>
            <p className="text-gray-600">Browse and search public Git repositories</p>
          </div>
        </header>
        
        <main className="container mx-auto py-6 px-4 flex-grow">
          <Routes>
            <Route path="/" element={<RepositoryList />} />
            <Route path="/repository/:owner/:repo" element={<RepositoryDetail />} />
            <Route path="*" element={
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-800">Page Not Found</h2>
                <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
                <Link to="/" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Back to Home
                </Link>
              </div>
            } />
          </Routes>
        </main>
        
        <footer className="bg-white py-4 border-t">
  <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
    SzSzEA © {new Date().getFullYear()}
  </div>
</footer>
</div>
</BrowserRouter>
);
}
export default App;
root.render(<App />);
