import React from "react";
import Team from "./Team";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

class Teams extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            searchTerm: '',
        };
        this.handleChangeSearchterm = this.handleChangeSearchterm.bind(this);
        this.filterSearch = this.filterSearch.bind(this);
    }

    componentDidMount() {
        fetch("http://api.football-data.org/v2/competitions/" + this.props.league + '/teams?season=2019',
            {
                method: 'GET',
                headers: {
                    'X-Auth-Token': 'ad91514ecc83429ea92e25199ef3d138'
                }
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        teams: result.teams
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

    filterSearch(team) {
        return team.name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
    }

    render() {
        const teams = this.state.teams ? this.state.teams.filter(this.filterSearch).map(team => {
            return (
                <Grid item xs={3}>
                    <Team team={ team }/>
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
                                label="Rechercher une équipe"
                                margin="normal"
                                onChange={ this.handleChangeSearchterm }
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        { teams }
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default Teams;
