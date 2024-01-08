import 'vite/client'
/// <reference types="vite/client" />

interface ImportMetaEnv {
  //  Alano BOD Credentials
  readonly VITE_S2S_BOD_ACCOUNT_ID: string
  readonly VITE_S2S_BOD_CLIENT_ID: string
  readonly VITE_S2S_BOD_CLIENT_SECRET: string
  readonly VITE_BOD_MEETING_ID: string
  readonly VITE_BOD_FEATURE_SECRET_TOKEN: string

  // Alano Meeting Credentials
  readonly VITE_S2S_MEETING_ACCOUNT_ID: string
  readonly VITE_S2S_MEETING_CLIENT_ID: string
  readonly VITE_S2S_MEETING_CLIENT_SECRET: string
  readonly VITE_MEETING_MEETING_ID: string
  readonly VITE_MEETING_FEATURE_SECRET_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
