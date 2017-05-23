import React from 'react';

class AppContainer extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="app-container">
                {this.props.children}
            </div>
        );
    }

}

export default AppContainer;