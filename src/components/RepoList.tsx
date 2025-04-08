import React, { useState, useEffect } from 'react';
import { searchRepositories, Repository } from '../services/forgejoService';
import RepositoryCard from './RepoCard';
import SearchBar from './SearchBar';

const RepositoryList: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const ITEMS_PER_PAGE = 12;

  const fetchRepositories = async (query: string, pageNum: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await searchRepositories(query, pageNum, ITEMS_PER_PAGE);
      console.log(response);
      if (response.ok) {
        if (pageNum === 1) {
          setRepositories(response.data);
        } else {
          setRepositories(prev => [...prev, ...response.data]);
        }
        setTotalCount(response.total_count);
        setHasMore(response.data.length === ITEMS_PER_PAGE && repositories.length + response.data.length < response.total_count);
      } else {
        setError('Failed to fetch repositories. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while fetching repositories.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset page when search query changes
    setPage(1);
    fetchRepositories(searchQuery, 1);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchRepositories(searchQuery, nextPage);
  };

  // Show loading skeletons when loading initial data
  if (loading && repositories.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-2" />
                <div className="h-4 bg-gray-300 rounded w-3/4" />
              </div>
              <div className="h-3 bg-gray-300 rounded w-1/2 mb-1" />
              <div className="h-3 bg-gray-300 rounded w-full mb-4" />
              <div className="h-3 bg-gray-300 rounded w-full mb-2" />
              <div className="flex justify-between items-center">
                <div className="h-3 bg-gray-300 rounded w-1/4" />
                <div className="h-3 bg-gray-300 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <div className="mt-4 mb-2 text-gray-600">
        Found {totalCount} repositories {searchQuery && `matching "${searchQuery}"`}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {repositories.map(repo => (
          <RepositoryCard key={repo.id} repository={repo} />
        ))}
      </div>
      
      {loading && repositories.length > 0 && (
        <div className="text-center my-4">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        </div>
      )}
      
      {hasMore && !loading && (
        <div className="text-center mt-6">
          <button 
            onClick={loadMore}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Load More
          </button>
        </div>
      )}
      
      {!hasMore && repositories.length > 0 && (
        <p className="text-center text-gray-500 mt-6">No more repositories to load</p>
      )}
      
      {!loading && repositories.length === 0 && (
        <div className="text-center py-10">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No repositories found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default RepositoryList;