import axios from 'axios'
import fs from 'fs'
import type { IZoomToken } from '../../utils/types'
import open from 'open'

export async function launchBODZoomMeeting<T extends IZoomToken>(token: T) {
  const meetingId = import.meta.env.VITE_BOD_MEETING_ID
  const bearerToken = token.access_token

  const url = `https://api.zoom.us/v2/meetings/${meetingId}`

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${bearerToken}`
      }
    })
    if (response.status === 200) {
      const startUrl = response.data['start_url']
      console.log('Start Url:', startUrl)
      open(startUrl)
    }
    return true
  } catch (error) {
    console.error('Error starting the meeting:', error)

    if (process.platform === 'darwin') {
      fs.writeFileSync(
        '/Users/Shared/error-logs/start-meeting-error-log.txt',
        `Caught exception in startZoomMeeting: ${error}\n`
      )
    }
    return false
  }
}
