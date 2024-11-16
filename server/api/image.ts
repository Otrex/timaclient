
import { defineEventHandler, getQuery, setResponseHeaders } from 'h3'
import { createError } from 'h3'
import fetch from 'node-fetch'

export default defineEventHandler(async (event) => {
  // Set CORS headers
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  })

  console.log("hello......");


  // Handle preflight requests
  if (event.method === 'OPTIONS') {
    return null
  }

  try {
    const query = getQuery(event)
    const imageUrl = query.url as string

    if (!imageUrl) {
      throw createError({
        statusCode: 400,
        message: 'Image URL is required'
      })
    }

    // Fetch the image
    const response = await fetch(imageUrl)

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        message: 'Failed to fetch image'
      })
    }

    // Get image buffer and content type
    const buffer = await response.buffer()
    const contentType = response.headers.get('content-type')

    // Set response headers
    setResponseHeaders(event, {
      'Content-Type': contentType || 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000'
    })

    return buffer
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error'
    })
  }
})


