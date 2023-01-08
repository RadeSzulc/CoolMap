import {useEffect, useState} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


function App() {
    let [cityName, setCityName] = useState('London');
    let [region, setRegion] = useState();
    let [country, setCountry] = useState();
    let [localTime, setLocalTime] = useState();
    var map;

    const getCity = () => {
        axios.get("http://api.weatherapi.com/v1/current.json?key=8bfae888c3cb4c68853121709230601&q="+cityName+"&aqi=no")
            .then(result => {

                var lat = result.data.location.lat;
                var lon = result.data.location.lon;
                setRegion(result.data.location.region);
                setCountry(result.data.location.country);
                setLocalTime(result.data.location.localtime);
                console.log(country)
                var L = window.L;
                var container = L.DomUtil.get('map');
                if(container != null){
                    container._leaflet_id = null;
                }
                map = L.map('map');
                map.setView([lat, lon], 8);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 20,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
            });
    }

    return (
        <div id="app" className="container my-3 d-flex flex-column">
            <h3>CoolMap</h3>

            <div className='parent-element'>
                <div id="map" className={"leaflet-container"}></div>
                <div className='cityStatus'>
                    <table className='table'>
                        <thead>
                        <tr>
                            <th scope='col'>City:</th>
                            <th scope="col">{cityName}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Region:</td>
                            <td>{region}</td>
                        </tr>
                        <tr>
                            <td>Country:</td>
                            <td>{country}</td>
                        </tr>
                        <tr>
                            <td>Local Time:</td>
                            <td>{localTime}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card mt-3">
                <div className="card-header">Search the city</div>
                <div className="card-body">
                    <div className="input-group input-group-sm">
                        <input
                            type="text"
                            className="form-control ms-2"
                            placeholder="Y"
                            onChange={(e) => setCityName(e.target.value)}
                            value={cityName}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-sm btn-primary" onClick={getCity}>
                                Show
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default App;