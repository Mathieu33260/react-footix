import React from "react";
import StickyHeadTable from "../StickyHeadTable";

class Classement extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
        };
    }

    componentDidMount() {
        fetch("http://api.football-data.org/v2/competitions/" + this.props.league + '/standings?standingType=TOTAL',
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
                        teams: result.standings[0].table
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    render() {
        return (
            <div>
                <StickyHeadTable teams={ this.state.teams }/>
            </div>
        );
    }
}

export default Classement;
