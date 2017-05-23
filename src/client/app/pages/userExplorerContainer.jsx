import React, {Component,} from 'react';
import UserStatsExplorer from './userExplorerStats.jsx'
import UserEventsExplorer from './userExplorerEvents.jsx'

import style from './styles/userExplorerContainer.css';


import { Tab, Nav, NavItem, Grid, Row} from 'react-bootstrap'


class UserExplorerDash extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Tab.Container className={style.userExplorerContainer} defaultActiveKey="userStats" >
                <Grid >
                    <Row className={"tabNavContainer-horizontal"} >
                        <Nav bsStyle="tabs">
                            <NavItem eventKey="userStats" >
                                User Statistics
                            </NavItem>
                            <NavItem eventKey="userCustomEvents">
                                User Events
                            </NavItem>
                        </Nav>
                    </Row>
                    <Row className={"tabContentContainer-horizontal"}>
                        <Tab.Content animation  >
                            <Tab.Pane eventKey="userStats" >
                                <UserStatsExplorer appId={this.props.appId}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="userCustomEvents" >
                                <UserEventsExplorer appId={this.props.appId}/>
                            </Tab.Pane>

                        </Tab.Content>
                    </Row>
                </Grid>
            </Tab.Container>

        )
    };
}

export default UserExplorerDash;