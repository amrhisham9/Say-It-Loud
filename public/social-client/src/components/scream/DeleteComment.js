import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MyButton from '../../util/myButton'
import DeleteIcon from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux'
import {deleteComment} from '../../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme,
    button: {
        position: 'relative',
        left: '90%',
        bottom: '55px'
    }
})

class DeleteScream extends Component {
    state= {
        open: false,
        id: this.props.id,
        screamId: this.props.screamId
    };
    handleOpen = () => {
        this.setState({open: true})

    }

    handleClose = () => {
        this.setState({open:false})
    }

    deleteComment = () => {
        this.props.deleteComment(this.state.id, this.state.screamId)
        this.setState({open:false})

    }

render() {
    const {classes} = this.props
    return (
        <Fragment>
              <MyButton tip="Delete Comment" onClick={this.handleOpen} btnClassName={classes.button}>
                    <DeleteIcon color="secondary" />
                </MyButton>
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth="sm">
                <DialogTitle>Delete Comment</DialogTitle>
                <DialogContent>
                    <Typography variant="body2">
                        Are you sure you want to delete this comment ?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.deleteComment} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
}

DeleteScream.propTypes = {
deleteComment: PropTypes.func.isRequired,
classes: PropTypes.object.isRequired,
scream: PropTypes.object.isRequired
}



export default connect(null,{deleteComment})(withStyles(styles)(DeleteScream))
