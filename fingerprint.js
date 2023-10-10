/* eslint-env browser */
/* global hash */

// eslint-disable-next-line no-unused-vars

// Function to fetch HTTP headers from the server
async function fetchHeaders() {
  try {
    const response = await fetch('/headers')
    if (response.ok) {
      const headers = await response.json()
      const secHeaders = Object.keys(headers).filter(header => header.startsWith('sec-'))
        .reduce((acc, header) => {
          acc[header] = headers[header];
          return acc;
        }, {});
      return secHeaders
    }
  } catch (error) {
    console.error('Error fetching headers:', error)
  }
  return null
}


async function fingerprint() {
  const screenResolution = window.screen.width + 'x' + window.screen.height
  const language = navigator.language
  const timezoneOffset = new Date().getTimezoneOffset()
  const headers = await fetchHeaders()
  return hash(screenResolution, language, timezoneOffset, headers)
}
