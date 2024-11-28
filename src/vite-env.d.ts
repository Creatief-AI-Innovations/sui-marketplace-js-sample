interface ImportMetaEnv {
  readonly VITE_MARKETPLACE_API_URL: string;
  readonly VITE_MARKETPLACE_API_KEY: string;
  readonly VITE_COLLECTION_ID: string;
  // add more environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}