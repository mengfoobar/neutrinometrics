import React, {Component,} from 'react';

import MainDashBoard from './overviewDash.jsx';
import CustomEvents from './customEvents.jsx'
import UserExplorerDash from './userExplorerContainer.jsx'


import style from './styles/homeContainer.css';

import FontAwesome from 'react-fontawesome'

import { Tab, TabContent, TabPane, Nav, NavItem, Grid, Col, Row} from 'react-bootstrap'


class MainDash extends Component {
    constructor() {
        super();
    }

    render() {

        return (
            <Grid className={style.homeContainer} >
                <Row className={style.divider} />
                <Row className={style.content} >
                    <Tab.Container  defaultActiveKey="overview" >
                        <Row className="clearfix" >
                            <Col className={"tabNavContainer"} >
                                <Nav bsStyle="pills" stacked>
                                    <NavItem eventKey="overview" bsStyle="neutrino">
                                        <div className="icon" >
                                            <FontAwesome name="dashboard" />
                                        </div>
                                        <div className="message">
                                            Dashboard
                                        </div>
                                    </NavItem>
                                    <NavItem eventKey="customEvents" bsStyle="neutrino">
                                        <div className="icon" >
                                            <FontAwesome name="bolt" />
                                        </div>
                                        <div className="message">
                                            Events
                                        </div>
                                    </NavItem>
                                    <NavItem eventKey="userExplorer" bsStyle="neutrino">
                                        <div className="icon" >
                                            <FontAwesome name="users" />
                                        </div>
                                        <div className="message">
                                            Users Explorer
                                        </div>
                                    </NavItem>
                                </Nav>
                            </Col>
                            <Col className={"tabContentContainer"} >
                                <TabContent >
                                    <TabPane eventKey="overview" >
                                        <MainDashBoard appId={this.props.params.appid}/>
                                    </TabPane>
                                    <TabPane eventKey="customEvents"  >
                                        <CustomEvents appId={this.props.params.appid} />
                                    </TabPane>
                                    <TabPane eventKey="userExplorer"  >
                                        <UserExplorerDash appId={this.props.params.appid} />
                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Row>
                <Row className={style.divider} />
            </Grid>

        )
    };
}

export default MainDash;