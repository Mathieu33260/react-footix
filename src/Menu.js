import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Icon} from "@material-ui/core";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

function Menu (props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });
    const [currentTab, setCurrentTab] = useState('Carte');

    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const onClickSetCurrentTab = (text) => {
        setCurrentTab(text);
        props.onChange(text);
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                {['Classement', 'Equipes', 'Meilleurs buteurs', 'Graphique', 'Carte'].map((text, index) => (
                    <ListItem button key={text} onClick={ () => onClickSetCurrentTab(text)  }>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );

    return (
        <div>
            <Button variant="contained" color="primary" startIcon={ <Icon>menu</Icon> } onClick={toggleDrawer('left', true)}>{ currentTab }</Button>
            <SwipeableDrawer
                open={state.left}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {sideList('left')}
            </SwipeableDrawer>
        </div>
    );
}

export default React.memo(Menu);
