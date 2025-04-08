import React from 'react';
import { Repository } from '../services/forgejoService';

interface RepositoryCardProps {
  repository: Repository;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-2">
        <img 
          src={repository.owner.avatar_url} 
          alt={`${repository.owner.login}'s avatar`} 
          className="w-8 h-8 rounded-full mr-2"
        />
        <h3 className="text-lg font-semibold text-blue-600 flex-grow truncate">
          {repository.name}
        </h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Owner:</span> {repository.owner.login}
      </p>
      
      {repository.description && (
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {repository.description}
        </p>
      )}
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
          </svg>
          <span>{repository.stars_count}</span>
        </div>
        <span>Updated: {new Date(repository.updated_at).toLocaleDateString()}</span>
      </div>
      
      <a 
        href={repository.html_url}
        target="_blank"
        rel="noopener noreferrer" 
        className="mt-3 inline-block text-sm text-white bg-blue-600 hover:bg-blue-700 rounded px-3 py-1 transition-colors"
      >
        View Repository
      </a>
    </div>
  );
};

export default RepositoryCard;