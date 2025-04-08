import axios from 'axios';

// Define types for Forgejo API responses
export interface Repository {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
  stars_count: number;
  html_url: string;
  created_at: string;
  updated_at: string;
}

export interface SearchResponse {
  ok: boolean;
  data: Repository[];
  total_count: number;
}

const API_BASE_URL = '/api/v1'; //set this to the route of the forgejo full URL

// Create axios instance with common configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Search repositories with optional query parameters
export const searchRepositories = async (
  query: string = '', 
  page: number = 1, 
  limit: number = 10
): Promise<SearchResponse> => {
  try {
    const response = await apiClient.get('/repos/search', {
      params: {
        q: query,
        page: page,
        limit: limit,
        sort: 'updated',
        order: 'desc',
      },
    });
    
    return {
      ok: true,
      data: response.data.data,
      total_count: response.data.total_count,
    };
  } catch (error) {
    console.error('Error searching repositories:', error);
    return {
      ok: false,
      data: [],
      total_count: 0,
    };
  }
};

// Get repository details
export const getRepository = async (owner: string, repo: string): Promise<Repository | null> => {
  try {
    const response = await apiClient.get(`/repos/${owner}/${repo}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching repository ${owner}/${repo}:`, error);
    return null;
  }
};