import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

export default function Player(props) {

    let player = props.player;

    return (
        <Card>
            <CardHeader
                title={ player.player.name }
                subheader={ player.team.name }
            />
            <CardContent>
                { player.numberOfGoals } buts cette saison
            </CardContent>
        </Card>
    );
}
