import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import ProfileSkeleton from '../../util/ProfileSkeleton'
import Typography from "@material-ui/core/Typography";
import EditDeatils from './EditDetails'
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import MyButton from '../../util/myButton'

import { connect } from "react-redux";
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
const styles = (theme) => ({
  ...theme
})
class Profile extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        this.props.uploadImage(formData);
      };
      handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
      };
      handleLogout= () => {
        this.props.logoutUser();
      }
  render() {
   
    const {
      classes,
      user: {
        credentials: { userHandle, createdAt, bio, website, avatar },
        loading,
        authenticated,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img
                src={`data:image/jpeg;base64,`+ avatar}
                alt="profile"
                className="profile-image"
              />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              
              <MyButton tip="Edit Profile Picture" onClick={this.handleEditPicture} btnClassName="button">
                <EditIcon color="primary" />
              </MyButton>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${userHandle}`}
                color="primary"
                variant="h5"
              >
                @{userHandle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color="primary" />{" "}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
            <MyButton tip="Logout" onClick={this.handleLogout}>
            <KeyboardReturn color="primary" />
              </MyButton>
            <EditDeatils />
          </div>
         
        </Paper>
       
        

      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No Profile Found Please Login
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <ProfileSkeleton />
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Profile));
