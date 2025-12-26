// Util to make sure Sketchfab models are valid, which is useful if The Hunt Museum deletes their models

const axios = require('axios');

async function isSketchfabModelValid(id) {
  const embedUrl = `https://sketchfab.com/models/${id}/embed`;
  try {
    /* Timeout tells axios to wait max 3000 ms for a response. If nothing comes back, the request is aborted and an error will be thrown. 
    Without this, a slow or unresponsive Sketchfab server could make the request hang indefinitely, freezing up the render. 
    https://axios-http.com/docs/req_config (Accessed July 21, 2025) */
    const res = await axios.head(embedUrl, { timeout: 3000 }); 
    // If the model exists and is reachable
    if (res.status === 200) {
      // console.log(`Sketchfab model exists: ${embedUrl}`);
      return true;
    }
    // If Sketchfab responds, but the model has been deleted (404 Not Found), set private (403 Forbidden), or there is a Sketchfab server error (500 Internal Server Error)
    console.log(`Sketchfab responded with ${res.status} for ${embedUrl}`);
    return false;
  } catch (err) {
    // If the request timed out (no response in 3s) or an error happened before getting an HTTP status
    console.log(`Sketchfab validation failed for ${embedUrl}: ${err.message}`);
    return false;
  }
}

module.exports = { isSketchfabModelValid };
