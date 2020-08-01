export default ({ $axios, req }) => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https://' : 'http://'

  if (process.client && window) {
    $axios.setBaseURL(protocol + window.location.host)
    console.log('New Client baseURL: ' + protocol + window.location.host)
  }
  if (process.server && req) {
    $axios.setBaseURL(protocol + req.headers.host)
    console.log('New Server baseURL: ' + protocol + req.headers.host)
  }
}
