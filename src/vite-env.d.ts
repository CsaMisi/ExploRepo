declare module '*.css';
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FORGEJO_API_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }