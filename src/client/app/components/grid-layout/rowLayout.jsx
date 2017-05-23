import React, {Component} from 'react';

import {Row} from 'react-bootstrap';

import '../styles/component.css'


class RowLayout extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {customStyle,appId, startDate, endDate} = this.props;
        return (
            <Row className='show-grid' style={ customStyle}>
                {
                    React.Children.map(this.props.children, function (child) {
                    return React.cloneElement(child, {
                        appId: appId,
                        startDate: startDate,
                        endDate: endDate
                    })
                })}
            </Row>
        )
    };
}

RowLayout.propTypes = {

};
RowLayout.defaultProps = {

};

export default RowLayout;
