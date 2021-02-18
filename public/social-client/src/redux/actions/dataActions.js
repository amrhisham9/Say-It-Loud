import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, SET_ERRORS, CLEAR_ERRORS,LOADING_UI, SET_SCREAM, STOP_LOADING_UI,SUBMIT_COMMENT, POST_THEME, EDIT_SCREAM, DELETE_COMMENT, EDIT_COMMENT, FOLLOW_THEME, UNFOLLOW_THEME, FOLLOW_USER, UNFOLLOW_USER,DELETE_THEME} from '../types'
import axios from 'axios'

export const getScreams = () => dispatch => {
    dispatch({type: LOADING_DATA});
    axios.get('/screams')
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            })  
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAMS,
                payload: [] 
            })
        })
}


export const getAuthScreams = () => dispatch => {
    dispatch({type: LOADING_DATA});
    console.log('hererere')
    axios.get('/screamsAuth')
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            })  
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAMS,
                payload: [] 
            })
        })
}

export const getScream = (id) => dispatch => {
    dispatch({type: LOADING_UI})
    axios.get(`/scream/${id}`)
        .then(res => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            })
            dispatch({
                type: STOP_LOADING_UI
            })
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAM,
                payload: {} 
            })
        })
}

export const likeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/like`)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
           
        })
        .catch(err => console.log(err));
}

export const unlikeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload:res.data
            })
        })
        .catch(err => console.log(err));
}

export const editScream = (screamId, body) => dispatch => {
    dispatch({type: LOADING_UI});
    axios.patch(`/scream/${screamId}`, body)
        .then(res => {
            dispatch({
                type: EDIT_SCREAM,
                payload:res.data
            })
            dispatch({
                type: CLEAR_ERRORS
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const editComment = (id, screamId, body) => dispatch => {
    dispatch({type: LOADING_UI});
    axios.patch(`/comment/${screamId}/${id}`, body)
        .then(res => {
            dispatch({
                type: EDIT_COMMENT,
                payload:res.data
            })
            dispatch({
                type: CLEAR_ERRORS
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}


export const deleteScream = (screamId) => dispatch => {
    axios.delete(`/scream/${screamId}`)
        .then(res => {
            dispatch({
                type: DELETE_SCREAM,
                payload:res.data
            })
        })
        .catch(err => console.log(err));
}

export const deleteComment = (id, screamId) => dispatch => {
    axios.delete(`/comment/${screamId}/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_COMMENT,
                payload:res.data
            })
        })
        .catch(err => console.log(err));
}

export const postScream = (screamDetails) => dispatch => {
    dispatch({type: LOADING_UI});
    axios.post(`/scream`,screamDetails)
        .then(res => {
            dispatch({
                type: POST_SCREAM,
                payload: res.data
            })
            dispatch({
                type: CLEAR_ERRORS
            })
        })
        .catch(err => {
            console.log(err.response.data)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}


export const submitComment = (id,commentData) => dispatch => {
    console.log(id,commentData)
    axios.post(`/scream/${id}/comment`,commentData)
        .then(res => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data.comment
            })
            dispatch(clearErrors())
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getUserData = userHandle => dispatch => {
    dispatch({type: LOADING_DATA});
    axios.get(`/user/${userHandle}`)
    .then(res => {
        dispatch({
            type: SET_SCREAMS,
            payload: res.data.screams
        })
    })
    .catch(err => {
        dispatch({
            type: SET_SCREAMS,
            payload: null
        })
    })
}


export const postTheme = (themeDetails, history) => dispatch => {
    dispatch({type: LOADING_UI});
    axios.post(`/theme`,themeDetails)
    
 .then(res => {
            dispatch({
                type: POST_THEME,
                payload: res.data
            })
            dispatch({
                type: CLEAR_ERRORS
            })
            history.push(`/themes/${themeDetails.themeName}`)
        })
        .catch(err => {
            console.log(err.response.data)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getTheme = (themeName) => dispatch => {
    dispatch({type: LOADING_UI});
    axios.get(`/theme/${themeName}`)
    
 .then(res => {
            dispatch({
                type: POST_THEME,
                payload: res.data
            })
            dispatch({
                type: CLEAR_ERRORS
            })
        })
        .catch(err => {
            console.log(err.response.data)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getThemeData = themeName => dispatch => {
    dispatch({type: LOADING_DATA});
    axios.get(`/theme/${themeName}`)
    .then(res => {
        dispatch({
            type: SET_SCREAMS,
            payload: res.data.screams
        })
    })
    .catch(err => {
        dispatch({
            type: SET_SCREAMS,
            payload: null
        })
    })
}




export const deleteTheme = (themeName, history) => dispatch => {
    axios.delete(`/theme/${themeName}`)
        .then(res => {
            dispatch({
                type: DELETE_SCREAM,
                payload:res.data
            })
            history.push('/')
        })
        .catch(err => console.log(err));
}



export const editTheme = (themeDescription, themeName) => dispatch => {
    console.log(themeDescription)
    axios.patch(`/theme/${themeName}`, {themeDescription})

        .then(res => {

        })
        .catch(err => console.log(err));
}



export const clearErrors = () => dispatch => {
    dispatch({type: CLEAR_ERRORS})
}