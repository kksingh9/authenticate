import React, {Fragment, useContext, useRef} from "react";
import AuthContext from '../../store/AuthContext';
import classes from './Profile.module.css';
import ProfileDetail from "./ProfileDetail";

const Profile = () => {
    const enterFullNameRef = useRef();
    const enterProfilePhotoUrlRef = useRef();
    const ctx = useContext(AuthContext);

    const submitHandler = (event) => {
            event.preventDefault();
            const enteredFullName = enterFullNameRef.current.value;
            const enteredProfilePhotoUrl = enterProfilePhotoUrlRef.current.value;

            fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBnQEvtto0FeB4KjaMBCBo2hoaTGrFe5m4',{
                method:'POST',
                body:JSON.stringify({
                    idToken: ctx.token,
                    displayName: enteredFullName,
                    photoUrl: enteredProfilePhotoUrl,
                    deleteAttribute: 'PHOTO_URL',
                    returnSecureToken: false,

                }),
                headers:{
                    'Content-Type': 'application/json' ,
                }
            }).then((response) => {
                if(response.ok){
                    return response.json;
                }else{
                    // return response.json.then((data) => {
                         let errorMessage = 'Authentication failed';
                        //   if (data && data.error && data.error.message){
                        //         errorMessage = data.error.message;
                        //   } 
                            
                          throw new Error(errorMessage);
                    //})
                    
                }
            })
            .then((data) => {
                console.log(data);
            }).catch((err) => {
                alert(err.message);
            })

    }
    const onCancelHandler = () => {
        ctx.logout();
    }

    return (
        <Fragment>
            <div>
                <p>winner never quite, Quitter never win.</p>
                <hr></hr>
            </div>
        <section className={classes.section}>
            <div className={classes.contact}>
            <h1>Contact Detail</h1>
            <button className={classes.cancel} onClick={onCancelHandler}>cancel</button>
            </div>
        <form onSubmit={submitHandler}>
            <div className={classes.profile}>
            <div>
            <label htmlFor="nameref">Full Name:</label>
            <input type="text" id="nameref" ref={enterFullNameRef} required />
            </div>
            <div className={classes.url}>
            <label htmlFor="htmlurl">Profile Photo URL :</label>
            <input type="url" id="htmlurl" ref={enterProfilePhotoUrlRef} required />
            </div>
            </div>
            <div className={classes.action}>
            <button>Update</button>
            </div>
        </form>
        <hr></hr>
        </section>
        <ProfileDetail />
        </Fragment>
    )
};

export default Profile;