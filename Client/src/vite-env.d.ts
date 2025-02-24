/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_ID: string;
    readonly VITE_APP_KEY: string;
    // otras variables de entorno que puedas tener
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}