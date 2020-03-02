import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: 'name', label: 'Equipes' },
    { id: 'points', label: 'Pts' },
    { id: 'playedGames', label: 'J' },
    { id: 'draw', label: 'N' },
    { id: 'won', label: 'V' },
    { id: 'lost', label: 'D' },
    { id: 'goalsFor', label: 'BP' },
    { id: 'goalsAgainst', label: 'BC' },
    { id: 'goalDifference', label: '+/-' },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    tableWrapper: {
        overflow: 'auto',
    },
});

function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status !== 404;

}

const logos = {
    'FC Nantes': 'https://upload.wikimedia.org/wikipedia/commons/6/68/FC-Nantes-blason-rvb.png',
    'Stade de Reims': 'https://upload.wikimedia.org/wikipedia/fr/0/02/Logo_Stade_Reims_1999.svg',
    'Lille OSC': 'https://upload.wikimedia.org/wikipedia/fr/7/70/Logo_LOSC_Lille.svg',
    'Toulouse FC': 'https://upload.wikimedia.org/wikipedia/fr/8/8b/Logo_Toulouse_FC_2018.svg',
    'Nîmes Olympique': 'https://upload.wikimedia.org/wikipedia/fr/f/f0/N%C3%AEmes_Olympique_logo_2018.svg'
};

export default function StickyHeadTable(props) {
    const classes = useStyles();
    let teams = props.teams;

    teams = teams.map(team => {
        let ret = {
            id: team.team.id,
            name: team.team.name,
            position: team.position,
            logo: team.team.crestUrl,
            points: team.points,
            playedGames: team.playedGames,
            draw: team.draw,
            won: team.won,
            lost: team.lost,
            goalsFor: team.goalsFor,
            goalsAgainst: team.goalsAgainst,
            goalDifference: team.goalDifference,
        };
        if (!imageExists(ret.logo)) {
            ret.logo = logos[ret.name];
        }
        return ret;
    });

    return (
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.map(team => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={team.id}>
                                    {columns.map(column => {
                                        const value = team[column.id];
                                        if (column.id === 'name') {
                                            return (
                                                <TableCell key={column.id} align={column.align} className="cell">
                                                    <span><strong>{ team.position }</strong></span>
                                                    <img className="logo" src={ decodeURI(team.logo) }/>
                                                    <span>{ value }</span>
                                                </TableCell>
                                            );
                                        }
                                        if (column.id === 'points') {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    <strong>{ value }</strong>
                                                </TableCell>
                                            );
                                        }
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                { value }
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </Paper>
    );
}
