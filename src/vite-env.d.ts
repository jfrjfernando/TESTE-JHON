/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ASSETS_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
