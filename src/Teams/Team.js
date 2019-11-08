import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status !== 404;

}

function extractColor(string) {
    let colors = string.replace(/\s+/g, '');
    return colors.split('/');
}

const logos = {
    'FC Nantes': 'https://upload.wikimedia.org/wikipedia/commons/6/68/FC-Nantes-blason-rvb.png',
    'Stade de Reims': 'https://upload.wikimedia.org/wikipedia/fr/0/02/Logo_Stade_Reims_1999.svg',
    'Lille OSC': 'https://upload.wikimedia.org/wikipedia/fr/7/70/Logo_LOSC_Lille.svg',
    'Toulouse FC': 'https://upload.wikimedia.org/wikipedia/fr/8/8b/Logo_Toulouse_FC_2018.svg',
    'Nîmes Olympique': 'https://upload.wikimedia.org/wikipedia/fr/f/f0/N%C3%AEmes_Olympique_logo_2018.svg'
};

export default function Team(props) {

    let team = props.team;

    if (!imageExists(team.crestUrl)) {
        team.crestUrl = logos[team.name];
    }

    return (
        <Card style={{ borderTop: '1rem solid ' + extractColor(team.clubColors)[0] }}>
            <CardHeader
                avatar={
                    <div className="cell">
                        <img className="logo" src={decodeURI(team.crestUrl)}/>
                    </div>
                }
                title={ team.name }
                subheader={ team.venue }
                style={{ borderTop: '1rem solid ' + extractColor(team.clubColors)[1] }}
            />
            <CardContent>
                { team.name }
            </CardContent>
        </Card>
    );
}
