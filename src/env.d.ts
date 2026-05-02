/// <reference types="@ngx-env/builder/env" />

/**
 * Declaración de las variables de entorno NG_APP_*
 * Estas son inyectadas en build-time desde el archivo .env
 */
interface ImportMetaEnv {
  readonly NG_APP_SUPABASE_URL: string;
  readonly NG_APP_SUPABASE_ANON_KEY: string;
  readonly NG_APP_PRODUCTION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
