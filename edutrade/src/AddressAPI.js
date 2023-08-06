var requestOptions = {
  method: 'GET',
};

export default async function FindAddress(text) {
  console.log(text);
  let list = [];
  await fetch("https://api.geoapify.com/v1/geocode/search?text="+text+"&limit=5&type=city&filter=countrycode:us,ca&format=json&apiKey=cd43814d5f9e463a87a3b89b2c00db26", requestOptions)
  .then(response => response.json())
  .then(result => {list = result;})
  .catch(error => console.log('error', error));

  console.log(list.results);
  return list;
}