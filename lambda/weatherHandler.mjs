import axios from 'axios';

exports.handler = async (event) => {
  const location = event.queryStringParameters.location || 'New York';  // Example location
  const apiKey = process.env.ACCUWEATHER_API_KEY;  // You should have this key in your Lambda environment variables

  try {
    const locationRes = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?q=${location}&apikey=${apiKey}`);
    const locationKey = locationRes.data[0].Key;

    const forecastRes = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`);
    
    return {
      statusCode: 200,
      body: JSON.stringify(forecastRes.data)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong' })
    };
  }
};
