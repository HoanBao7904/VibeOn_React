/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string // Khai báo để TS hiểu
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
