import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Player from "./Player";

class Players extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            searchTerm: '',
        };
        this.handleChangeSearchterm = this.handleChangeSearchterm.bind(this);
        this.filterSearch = this.filterSearch.bind(this);
    }

    componentDidMount() {
        fetch("http://api.football-data.org/v2/competitions/" + this.props.league + '/scorers?limit=1000',
            {
                method: 'GET',
                headers: {
                    'X-Auth-Token': 'ad91514ecc83429ea92e25199ef3d138'
                }
            })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        players: result.scorers
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    handleChangeSearchterm(event) {
        this.setState({ searchTerm: event.target.value });
    }

    filterSearch(player) {
        return player.player.name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
    }

    render() {
        const players = this.state.players ? this.state.players.filter(this.filterSearch).map(player => {
            return (
                <Grid item xs={3}>
                    <Player player={ player }/>
                </Grid>
            );
        }) : [];
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                id="standard-basic"
                                label="Rechercher un joueur"
                                margin="normal"
                                onChange={ this.handleChangeSearchterm }
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        { players }
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default Players;
