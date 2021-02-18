import React, { Fragment, useEffect, useState} from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { followUser, unFollowUser } from "../../redux/actions/userActions";
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = (theme) => ({
  ...theme,
});

const StaticProfile = (props) => {

  const [loading, setload] = useState(props.loading)
  const [pfollowing, setPfollowing] = useState(props.user.credentials.following)
  
  useEffect(() => {
  setload(props.loading)
  },[props.loading])

  useEffect(() => {
    console.log(props.user.credentials.following)
  setPfollowing(props.user.credentials.following)
  },[props.user.credentials.following])

  const {
    classes,
    user: {
      credentials: { userHandle: userMe , following},
    },
    profile: { userHandle, createdAt, avatar, bio, website },
  } = props;
  const handle = props.user.credentials.userHandle;
  const authh = props.user.credentials.authenticated;

  const checkFollowed = pfollowing && pfollowing.find((user) => {
    return user.userHandle === userHandle;

  });
  console.log(checkFollowed)
  const handleFollow = (userHandle) => {
    props.followUser(userHandle);
  };
  const handleUnFollow = (userHandle) => {
    props.unFollowUser(userHandle);
  }

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img
            src={`data:image/jpeg;base64,` + avatar}
            alt="profile"
            className="profile-image"
          />
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
              <a href={website} targe="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <hr />
            </Fragment>
          )}
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "15px" }}>
        {userHandle != handle && !checkFollowed ? (
          <Button
            variant="contained"
            color="primary"
            className="follow-bottom"
            onClick={() => handleFollow(userHandle)}
            disabled={loading}
          >
           {loading && (<CircularProgress size={30} className={classes.progress}/>)}
            Follow
          </Button>
        ) : userHandle != handle && checkFollowed ? (
          <Button
            variant="contained"
            color="primary"
            className="follow-bottom"
            onClick={() => handleUnFollow(userHandle)}
            disabled={loading}
          >
          {loading && (<CircularProgress size={30} className={classes.progress}/>)}
            UnFollow
          </Button>) : null}
      </div>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  user: state.user,
});

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { followUser, unFollowUser })(
  withStyles(styles)(StaticProfile)
);
