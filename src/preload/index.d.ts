import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      startZoomMeeting: () => Promise<boolean>
      startBODZoomMeeting: () => Promise<boolean>
    }
  }
}
