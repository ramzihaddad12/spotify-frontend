import SpotifyWebApi from 'spotify-web-api-js';

const clientId = '14637697894f4a56a2e81345498463aa';
const clientSecret = 'b95d99f3ee5a4826b51bb2b79750536e';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
  });


fetch(tokenEndpoint, {
method: 'POST',
headers: {
	'Content-Type': 'application/x-www-form-urlencoded',
	'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
},
body: 'grant_type=client_credentials',
}).then(response => response.json())
.then(data => {
	const accessToken = data.access_token;
	console.log('Access token:', accessToken);
	// set the access token on the spotifyApi object
	spotifyApi.setAccessToken(accessToken);
	// use the access token to make authenticated requests to the Spotify Web API
})
.catch(error => {
	console.error('Error getting access token:', error);
})


export default spotifyApi;
