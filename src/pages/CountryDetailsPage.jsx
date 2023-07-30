import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CountryDetails() {
  const [fetching, setFetching] = useState(true);
  const [countryDetails, setCountryDetails] = useState(null);
  const { countryId } = useParams();

  useEffect(() => {
    getCountryDetails();
  }, [countryId]);

  async function getCountryDetails() {
    try {
      const fetchedData = await axios.get(
        "https://ih-countries-api.herokuapp.com/countries/" + countryId
      );
      setCountryDetails(fetchedData.data);
    } catch (err) {
      console.log(err);
    }
    setFetching(false);
  }

  return (
    <div className="container">
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>Country Details</p>

      {fetching ? (
        <p>Loading...</p>
      ) : (
        <div key={countryDetails._id} >
          <>
          <div style={{marginTop: "50px"}}>
          <img src={`https://flagpedia.net/data/flags/icon/72x54/${countryDetails.alpha2Code.toLowerCase()}.png`}/>
          </div>
            <h1>{countryDetails.name.official}</h1>

            <table className="table">
              <thead></thead>
              <tbody>
                <tr>
                  <td style={{ width: "30%" }}>Capital</td>
                  <td>{countryDetails.capital}</td>
                </tr>
                <tr>
                  <td>Area</td>
                  <td>
                    {countryDetails.area}
                    <sup>2</sup>
                  </td>
                </tr>
                <tr>
                  <td>Borders</td>
                  <td>
                    <ul style={{ listStyle: "none"}} className="list-group-item list-group-item-action">
                      {countryDetails.borders.map((borderCountry) => {
                        return (
                          <div key={borderCountry}>
                            <li>
                              <Link to={`/${borderCountry}`}>
                                {borderCountry}
                              </Link>
                            </li>
                          </div>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        </div>
      )}
    </div>
  );
}

export default CountryDetails;
