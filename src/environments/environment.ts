export const environment = {
  production: import.meta.env.NG_APP_PRODUCTION === 'true',
  supabaseUrl: import.meta.env.NG_APP_SUPABASE_URL ?? '',
  supabaseKey: import.meta.env.NG_APP_SUPABASE_ANON_KEY ?? '',
};
