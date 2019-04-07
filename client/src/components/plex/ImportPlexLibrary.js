import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import TextHeader from '../helpers/Header';
import styles from '../../css/materialize.css.js';
import '../../css/materialize.css';
import * as actions from '../../actions';

class ImportPlexLibrary extends Component {
  componentDidMount() {
    this.props.fetchMedia();
  }
  render() {
    const {classes} = this.props;
    return (
      <div>
        <React.Fragment>
          <CssBaseline />
          <main className="padding-bottom-5">
            <div className={classes.heroUnit}>
              <div className={classes.heroContent}>
                <img
                  className="responsive-img"
                  src={
                    process.env.PUBLIC_URL + '/icons/facebook_cover_photo_2.png'
                  }
                  alt="logo"
                />
              </div>
            </div>
          </main>
        </React.Fragment>
      </div>
    );
  }
}

ImportPlexLibrary.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(
  mapStateToProps,
  actions,
)(withStyles(styles)(ImportPlexLibrary));
