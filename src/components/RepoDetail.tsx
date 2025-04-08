import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRepository, Repository } from '../services/forgejoService';

const RepositoryDetail: React.FC = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositoryDetails = async () => {
      if (!owner || !repo) {
        setError('Repository information is missing');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const repoData = await getRepository(owner, repo);
        if (repoData) {
          setRepository(repoData);
        } else {
          setError('Repository not found');
        }
      } catch (err) {
        setError('Failed to load repository details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositoryDetails();
  }, [owner, repo]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
        <span className="block sm:inline">{error}</span>
        <div className="mt-4">
          <Link to="/" className="text-blue-600 hover:underline">Back to repository list</Link>
        </div>
      </div>
    );
  }

  if (!repository) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to repository list
      </Link>
      
      <div className="flex items-center mb-6">
        <img 
          src={repository.owner.avatar_url} 
          alt={`${repository.owner.login}'s avatar`} 
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{repository.name}</h1>
          <p className="text-gray-600">Owned by {repository.owner.login}</p>
        </div>
      </div>
      
      {repository.description && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Description</h2>
          <p className="text-gray-700">{repository.description}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-medium text-gray-800 mb-2">Repository Stats</h3>
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
            <span>{repository.stars_count} stars</span>
          </div>
          <div className="text-sm text-gray-600">
            <p>Created: {new Date(repository.created_at).toLocaleDateString()}</p>
            <p>Last updated: {new Date(repository.updated_at).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-medium text-gray-800 mb-2">Links</h3>
          <a 
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline block mb-2"
          >
            View on Forgejo
          </a>
          {/* Add more links here (e.g. issues, pull requests) as needed */}
        </div>
      </div>
      
      <div className="mt-6">
        <a 
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer" 
          className="inline-block text-white bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 transition-colors"
        >
          Open Repository
        </a>
      </div>
    </div>
  );
};

export default RepositoryDetail;