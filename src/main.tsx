import React from 'react';
import ReactDOM from 'react-dom/client';
import RepositoryList from './components/RepoList';
import './App.css'


const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">SZSZEA ExloRepo</h1>
          <p className="text-gray-600">Browse and search public Git repositories</p>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4">
        <RepositoryList />
      </main>
      
      <footer className="bg-white mt-auto py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          SZSZEA © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;