import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {CircleMarker, Map, TileLayer, Popup} from 'react-leaflet';
import jsonGet from "../jsonGet";

let matchdays = [];
let matches = [];
let locations = [];
let teams = [];
let teamsLocation = [];

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class MapCustom extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchTerm: '',
        };
        this.handleChangeSearchterm = this.handleChangeSearchterm.bind(this);
        this.filterSearch = this.filterSearch.bind(this);
    }

    async componentDidMount() {
        await fetch("http://api.football-data.org/v2/competitions/" + this.props.league + '/matches',
            {
                method: 'GET',
                headers: {
                    'X-Auth-Token': 'ad91514ecc83429ea92e25199ef3d138'
                },
                mode: 'cors'
            })
            .then(res => res.json())
            .then(
                (result) => {
                    let data = [];
                    matchdays = Array.from(new Set(result.matches.map(match => match.matchday)));
                    teams = Array.from(new Set(result.matches.map(match => match.homeTeam.name)));
                    console.log(matchdays);
                    matches = result.matches;

                    matches.forEach(match => {
                        if (match.status === 'FINISHED') {
                            let city = data.find(dat => dat.city === match.homeTeam.name);

                            if (city) {
                                city.goals += match.score.fullTime.homeTeam + match.score.fullTime.awayTeam;
                            } else {
                                data.push({
                                    goals: match.score.fullTime.homeTeam + match.score.fullTime.awayTeam,
                                    city: match.homeTeam.name,
                                });
                            }
                        }
                    });
                    Promise.all(teams.map(jsonGet)).then((result) => {
                        result.forEach(res => {
                            if (res) {
                                teamsLocation.push(res);
                            }
                        });
                        this.setState({
                            data: data
                        })
                    }, { once: true });
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    handleChangeSearchterm(event) {
        this.setState({ searchTerm: event.target.value });
    }

    filterSearch(team) {
        return this.state.searchTerm ? team.city.toLowerCase().includes(this.state.searchTerm.toLowerCase()) : true;
    }

    render() {
        let markers = this.state.data.filter(this.filterSearch).map(city => {
            let location = teamsLocation.find(loc => loc.city === city.city);
            if (location) {
                console.log('location', location);
                return (
                    <CircleMarker key={ city.city } center={ location.location } radius={city.goals}>
                        <Popup>
                            { city.goals } buts
                        </Popup>
                    </CircleMarker>
                );
            }
            return;
        });
        let center = this.state.data.length ? this.state.data[0].location : [48.8587741, 2.2069771];
        return (
            <Grid container spacing={3}>
                <h1>Buts marqués dans chaque stade</h1>
                <div className="leaflet-container">
                    <Map center={ center } zoom={ 6 }>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        { markers }
                    </Map>
                </div>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                id="standard-basic"
                                label="Rechercher une équipe"
                                margin="normal"
                                onChange={ this.handleChangeSearchterm }
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default MapCustom;
