import React, { useEffect, useState } from 'react'
import './body2.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const CLIENT_ID = '49f4886fced24115a6bd2640d65706d5';
const CLIENT_SECRET = '1fd7a9a5131a4d89a4484a1bcc291977';
export default function Body2() {
    const [accessToken, setAccessToken] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [topalbum, setTopalbum] = useState([]);

    useEffect(() => {
        var authParamets = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token', authParamets)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
    }, [])
    async function songs(event) {
        event.preventDefault()
        var authParameters1 = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }
        var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', authParameters1)
            .then(result => result.json())
            .then(data => { return data.artists.items[0].id })

        var top_album_artist = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/top-tracks?country=US', authParameters1)
            .then((response) => {
                if (response.ok) {
                    // Handle a successful response
                    return response.json();
                } else {
                    // Handle an error response
                    throw new Error('Failed to fetch data');
                }
            })
            .then((data) => {
                if (data && data.tracks) {
                    console.log(data.tracks);
                    setTopalbum(data.tracks);
                } else {
                    console.error('Top tracks data not found');
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }
    return (
        <div className="main-body-2">
            <div className="main-2">
                <form className="search-2" name='search-2' id='search-2' onSubmit={songs}>
                    <input
                        name='search_artist'
                        className='search_artist'
                        placeholder='Enter Name of Artist'
                        onChange={(e) => setSearchInput(e.target.value)}
                        value={searchInput}>
                    </input>
                    <button className='search_button-2' ></button>
                </form>
            </div>
            <div className="artists_cards">
                {topalbum.map((top, i) => {
                    return (
                        <div className="card" style={{ maxWidth: "800px" ,margin:"0 auto",marginLeft:"100px"}}>
                            <div className="row">
                                <div className="col-sm-4 p-3">
                                    <img src={top.album.images[0].url} className="card-img" alt="..." style={{ maxWidth: "100%" }} />
                                </div>
                                <div className="col-md-8 p-3">
                                    <div className="card-body" style={{ maxHeight: "100%", overflow: "hidden" }}>
                                        <h4>{top.name}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>


                    )
                })}

            </div>
        </div >
    )
}





