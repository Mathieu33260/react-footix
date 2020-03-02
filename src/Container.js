import React from "react";
import Menu from "./Menu";
import Classement from "./Classement/Classement";
import Teams from "./Teams/Teams";
import Players from "./Players/Players";
import Chart from './Chart/Chart'
import MapCustom from "./Map/Map";

class Container extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange(value) {
        this.setState({ currentTab: value });
    }

    renderCurrentTab() {
        switch (this.state.currentTab) {
            case 'Classement':
                return (
                    <Classement league={ this.props.league }/>
                );
            case 'Equipes':
                return (
                    <Teams league={ this.props.league }/>
                );
            case 'Meilleurs buteurs':
                return (
                    <Players league={ this.props.league }/>
                );
            case 'Graphique':
                return (
                    <Chart league={ this.props.league }/>
                );
            case 'Carte':
                return (
                    <MapCustom league={ this.props.league }/>
                );
            default:
                return (
                    <MapCustom league={ this.props.league }/>
                );
        }
    }

    render() {
        return (
            <div>
                <Menu onChange={ this.handleTabChange }/>
                { this.renderCurrentTab() }
            </div>
        );
    }
}

export default Container;
