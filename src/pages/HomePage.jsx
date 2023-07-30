import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [allCountryData, setAllCountryData] = useState([]);

  useEffect(() => {
    async function getCountryData() {
      try {
        const fetchedData = await axios.get(
          "https://ih-countries-api.herokuapp.com/countries"
        );
        setAllCountryData(fetchedData.data);
      } catch (err) {
        console.log(err);
      }
    }
    if (allCountryData.length === 0) {
      getCountryData();
    }
  }, []);

  return (
    <div className="container" style={{maxHeight: "90vh", overflow: scroll}}>
      <h1 style={{fontSize: "24px"}}>WikiCountries: Your Guide to the World</h1>
      <div className="list-group">
      <ul style={{listStyle: "none"}}>
        {allCountryData.map((country) => {
          return (
            <div key={country._id} className="list-group-item list-group-item-action">
              <li><img src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} /></li>
              <li><Link to={`/${country.alpha3Code}`}>{country.name.official}</Link></li>
            </div>
          );
        })}
      </ul>
      </div>
    </div>
  );
}

export default HomePage;
