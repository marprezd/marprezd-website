import { Buffer } from 'node:buffer'
import { defineEventHandler, useRuntimeConfig } from '#imports'

// This handler fetches the data for the previous day from the Wakapi API
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const endpoint = config.public.wakapiYesterday
  const apiKey = config.wakapiApiKey

  // Validate the endpoint and API key
  // Ensure that the endpoint and API key are provided
  if (!endpoint || !apiKey) {
    return { error: 'Missing endpoint or API key' }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${apiKey}`).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })

    // You might want to handle the response here, e.g.:
    const data = await response.json()
    return data
  }
  catch (error) {
    return { error: 'Failed to fetch data', details: error instanceof Error ? error.message : String(error) }
  }
})
