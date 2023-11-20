import moment from "moment";

const GetRates = (values, setMealRate, setLodgingRate) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: `{"year":2023,"city":${JSON.stringify(
      values.City
    )},"state":${JSON.stringify(values.State)}}`,
  };
  fetch(
    "http://ec2-3-239-97-174.compute-1.amazonaws.com:9291/api/travel/perdiem/byCityStateYear",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response.status);
      if (response.status === "OK") {
        
        return (
            setMealRate(response.payload.rates[0].rate[0].meals),
            setLodgingRate(
              response.payload.rates[0].rate[0].months.month.filter(
                (item, index) => item.long === moment().format("MMMM")
              )
            )
        );
      }
    })
    .catch((err) => console.error(err));
};

export default GetRates;
