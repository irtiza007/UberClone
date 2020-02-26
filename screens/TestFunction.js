import console = require("console");

export default Animation=async()=>{
    var res = '';
    //console.log(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.currentLatitude},${this.state.currentLongitude}&radius=50&key=AIzaSyDdydS8GQ-W6t86nyYfkun9iN7hBn9ER8o`)
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.7212782,73.0796787&radius=1500&key=AIzaSyBlFCXSUnH5zskXVGtJIERiyrcqJ-IoFds`)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      res = responseJson.results[0].name;
    })
    .catch((error) => {
      res = error.message;
    });
    
    return res.toString();
  }