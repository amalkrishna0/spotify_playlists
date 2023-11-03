import React, { useEffect, useState } from 'react'
import './body.css';


const CLIENT_ID = '49f4886fced24115a6bd2640d65706d5';
const CLIENT_SECRET = '1fd7a9a5131a4d89a4484a1bcc291977';
export default function Body() {
    const [searchInput, setSearchInput] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [albums, setAlbums] = useState([]);
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
  
    async function search(event) {
        console.log("searching for" + searchInput)
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

        var artist_albums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums', authParameters1)
            .then(result => result.json())
            .then(data => {
                console.log(data.items)
                setAlbums(data.items)
            })
            

    }
    return (
        <div className="main_body">
            <button className='next-page'>Top Tracks</button>
            <div className="main">
                <form className="search" name='search' id='search' onSubmit={search}>
                    <input
                        name='search_artist'
                        className='search_artist'
                        placeholder='Enter Name of Artist'
                        onChange={(e) => setSearchInput(e.target.value)}
                        value={searchInput}>
                    </input>
                    <button className='search_button' ></button>
                </form>
            </div>
            <div className="card_box">
                <div className="row">
                    {albums.map((albumKey, i) => {
                        return (
                            <div className="col-md-4 p-3" key={i}>

                                <div class="card">
                                    <img class="card-img-top" src={albumKey.images[1].url} alt="Card image cap" />
                                    <div class="card-body">
                                        <p class="card-text"><strong>{albumKey.name}</strong></p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>

    )
}   