import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Line } from 'react-chartjs-2';

let matchdays = [];
let matches = [];

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class Chart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataset: [],
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
                    let dataset = [];
                    matchdays = Array.from(new Set(result.matches.map(match => match.matchday)));
                    console.log(matchdays);
                    matches = result.matches.sort((a, b) => {
                        if (a.matchday < b.matchday) {
                            return -1;
                        }
                        if (a.matchday > b.matchday) {
                            return 1;
                        }
                        return 0
                    });
                    matches.forEach(match => {
                        if (match.status === 'FINISHED') {
                            let homeTeam = dataset.find(dat => dat.label === match.homeTeam.name);
                            let awayTeam = dataset.find(dat => dat.label === match.awayTeam.name);
                            if (homeTeam) {
                                let nbPoint;
                                if (match.score.winner === 'HOME_TEAM') {
                                    nbPoint = 3;
                                } else if (match.score.winner === 'AWAY_TEAM') {
                                    nbPoint = 0;
                                } else {
                                    nbPoint = 1;
                                }
                                let nbPoints = homeTeam.data[homeTeam.data.length - 1].y + nbPoint;
                                homeTeam.data.push({x: match.matchday, y: nbPoints});
                            } else {
                                let nbPoint;
                                if (match.score.winner === 'HOME_TEAM') {
                                    nbPoint = 3;
                                } else if (match.score.winner === 'AWAY_TEAM') {
                                    nbPoint = 0;
                                } else {
                                    nbPoint = 1;
                                }
                                dataset.push({
                                    label: match.homeTeam.name,
                                    data: [{x: match.matchday, y: nbPoint}],
                                    fill: false,
                                    borderColor: getRandomColor()
                                });
                            }

                            if (awayTeam) {
                                let nbPoint;
                                if (match.score.winner === 'AWAY_TEAM') {
                                    nbPoint = 3;
                                } else if (match.score.winner === 'HOME_TEAM') {
                                    nbPoint = 0;
                                } else {
                                    nbPoint = 1;
                                }
                                let nbPoints = awayTeam.data[awayTeam.data.length - 1].y + nbPoint;
                                awayTeam.data.push({x: match.matchday, y: nbPoints});
                            } else {
                                let nbPoint;
                                if (match.score.winner === 'AWAY_TEAM') {
                                    nbPoint = 3;
                                } else if (match.score.winner === 'HOME_TEAM') {
                                    nbPoint = 0;
                                } else {
                                    nbPoint = 1;
                                }
                                dataset.push({
                                    label: match.awayTeam.name,
                                    data: [{x: match.matchday, y: 1}],
                                    fill: false,
                                    borderColor: getRandomColor()
                                });
                            }
                        }
                    });
                    this.setState({
                        dataset: dataset
                    })
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
        return team.label.toLowerCase().includes(this.state.searchTerm.toLowerCase());
    }

    render() {
        let datas = {
            labels: matchdays,
            datasets: this.state.dataset.filter(this.filterSearch),
        };
        console.log(datas);
        return (
            <Grid container spacing={3}>
                <h1>Évolution des points par équipe au cours des journées de championnat</h1>
                <Line data={ datas } />
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

export default Chart;
