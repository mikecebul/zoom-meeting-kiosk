import axios from 'axios'
import fs from 'fs'
import type { IZoomToken } from '../../utils/types'

export async function getMeetingZoomToken<T extends IZoomToken>(): Promise<T | undefined> {
  const accountId = import.meta.env.VITE_S2S_MEETING_ACCOUNT_ID
  const clientId = import.meta.env.VITE_S2S_MEETING_CLIENT_ID
  const clientSecret = import.meta.env.VITE_S2S_MEETING_CLIENT_SECRET

  const base64Credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const url = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`

  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Host: 'zoom.us',
          Authorization: `Basic ${base64Credentials}`
        }
      }
    )

    if (response.status === 200) {
      console.log('Token', response.data)
      return response.data
    } else {
      console.log(`Failed to fetch, status: ${response.status}`)
      return undefined
    }
  } catch (error) {
    console.error('Error fetching data:', error)

    if (process.platform === 'darwin') {
      fs.writeFileSync(
        '/home/mike/Documents/error-logs/get-meeting-zoom-token-error-log.txt',
        `Axios Error during getZoomToken: ${error}\n`
      )
      return undefined
    }
  }
}
