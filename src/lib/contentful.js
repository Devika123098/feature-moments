import { createClient } from 'contentful'

export const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
})

export const fetchMoments = async () => {
  try {
    const entries = await client.getEntries({
      content_type: 'moment'
    })
    return entries.items
  } catch (error) {
    console.error('Error fetching moments:', error)
    return []
  }
}
