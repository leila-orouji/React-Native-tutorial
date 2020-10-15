import *  as actionTypes from './actionTypes';
import {baseUrl} from './../shared/baseUrl';

//------------------------------------------------------Dishes
export const fetchdishes = () => (dispatch) =>{
    dispatch(dishesLoading());
    return fetch(baseUrl+ 'dishes')
           .then(response => {
               if (response.ok) {return response}
               else {var error = new Error('error '+ response.status +': '+response.statusText)
               error.response = response;
               throw error;
            };
           }, 
           error => {
               var errMess = new Error(error.message);
               throw errMess;
           })
           .then(response => response.json())
           .then(dishes => dispatch(addDishes(dishes)))
           .catch(error => dispatch(dishesFailed(error)))
}
export const addDishes = dishes => {
    return {
        type : actionTypes.ADD_DISHES,
        payload : dishes
    }
}
export const dishesLoading = () => {
    return {
        type : actionTypes.DISHES_LOADING,  
    }
}
export const dishesFailed = (err) => {
    return {
        type : actionTypes.DISHES_FAILED,
        payload : err
    }
}

//----------------------------------------------------Leaders
export const fetchleaders = () => (dispatch) =>{
    dispatch(leadersLoading());
    return fetch(baseUrl+ 'Corporates')
           .then(response => {
               if (response.ok) {return response}
               else {var error = new Error('error '+ response.status +': '+response.statusText)
               error.response = response;
               throw error;
            };
           }, 
           error => {
               var errMess = new Error(error.message);
               throw errMess;
           })
           .then(response => response.json())
           .then(leaders => dispatch(addLeaders(leaders)))
           .catch(error => dispatch(leadersFailed(error)))
}
export const addLeaders = leaders => {
    return {
        type : actionTypes.ADD_LEADERS,
        payload : leaders
    }
}
export const leadersLoading = () => {
    return {
        type : actionTypes.LEADERS_LOADING,  
    }
}
export const leadersFailed = (err) => {
    return {
        type : actionTypes.LEADERS_FAILED,
        payload : err
    }
}

//-------------------------------------------------------------Promotions
export const fetchpromotions = () => (dispatch) =>{
    dispatch(promotionsLoading());
    return fetch(baseUrl+ 'promotions')
           .then(response => {
               if (response.ok) {return response}
               else {var error = new Error('error '+ response.status +': '+response.statusText)
               error.response = response;
               throw error;
            };
           }, 
           error => {
               var errMess = new Error(error.message);
               throw errMess;
           })
           .then(response => response.json())
           .then(promotions => dispatch(addPromotions(promotions)))
           .catch(error => dispatch(promotionsFailed(error)))
}
export const addPromotions = promotions => {
    return {
        type : actionTypes.ADD_PROMOTIONS,
        payload : promotions
    }
}
export const promotionsLoading = () => {
    return {
        type : actionTypes.PROMOTIONS_LOADING,  
    }
}
export const promotionsFailed = () => {
    return {
        type : actionTypes.PROMOTIONS_FAILED,
        payload : 'Error in loading promotions'
    }
}

//--------------------------------------------------------------Comments
export const fetchcomments = () => (dispatch) =>{
    return fetch(baseUrl+ 'Comments')
           .then(response => {
               if (response.ok) {return response}
               else {var error = new Error('error '+ response.status +': '+response.statusText)
               error.response = response;
               throw error;
            };
           }, 
           error => {
               var errMess = new Error(error.message);
               throw errMess;
           })
           .then(response => response.json())
           .then(comments => dispatch(addComments(comments)))
           .catch(error => dispatch(commentsFailed(error)))
}

export const addComments = comments => {
    return {
        type : actionTypes.ADD_COMMENTS,
        payload : comments
    }
}
export const commentsFailed =(error) => {
    return {
        type : actionTypes.COMMENTS_FAILED,
        payload : error
    }
}