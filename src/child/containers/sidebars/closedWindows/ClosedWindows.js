import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import closedWindowsImageInactive from '../../../assets/png/closed_tabs.png';
import closedWindowsImageActive from '../../../assets/png/closed_tabs_active.png';

import { reopenWindow } from '../../../actions/sidebar';

class ClosedWindows extends Component {

    constructor(props) {
        super(props);
        this.onOpenWindowClick = this.onOpenWindowClick.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    componentDidMount() {
        this.setState({ iconHover: false});
    }

    onOpenWindowClick(e) {
        e.stopPropagation();
        this.props.bindings.openWindow();
    }

    onMouseOver() {
        this.setState({ iconHover: true});
    }

    onMouseOut() {
        this.setState({ iconHover: false});
    }

    render() {
        const { iconHover } = this.state || false;
        const icon = iconHover ? closedWindowsImageActive : closedWindowsImageInactive;

        return (
            <div>
                <img
                  src={icon}
                  className="bottom-icon"
                  draggable="false"
                  onClick={this.onOpenWindowClick}
                  onMouseOver={this.onMouseOver}
                  onMouseOut={this.onMouseOut}
                />
            </div>
        );
    }
}

ClosedWindows.propTypes = {
    bindings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const unopenedWindows = state.closedWindows ? Object.keys(state.closedWindows) : null;
    return { unopenedWindows };
}

export default connect(mapStateToProps)(ClosedWindows);
