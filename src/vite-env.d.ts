/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_API_URL: string;
  readonly VITE_GTM_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Kakao: any;
}
