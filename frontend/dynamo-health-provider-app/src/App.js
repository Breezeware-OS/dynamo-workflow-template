import React, {useEffect, useState,useRef} from 'react';
import axios from 'axios';
import AppRouter from './routes/AppRouter';
import keycloakJS from './Keycloak';

function App() {
  const [user, setUser] = useState();


  const isRun = useRef(false);

  const initialAuth = async () => {
    try {
      const authenticated = await keycloakJS.init({onLoad: 'login-required'});
      console.log(
        `User is ${authenticated ? 'authenticated' : 'not authenticated'}`,
      );
      if (authenticated) {
        const token = keycloakJS.token;
        axios.interceptors.request.use(
          (axios.defaults.headers = {
            Authorization: 'Bearer ' + token,
          }),
        );
        const profile = await keycloakJS.loadUserProfile();
        console.log(profile, 'profile');
        setUser(profile);
      } else {
        signOut();
      }
    } catch (error) {
      console.log('Failed to initialize adapter:', error);
    }
  };
 

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;
    initialAuth();
  }, []);

  const signOut = () => {
    keycloakJS.logout({redirectUri: 'http://localhost:3002/'});
  };

  return  user && (
      <AppRouter user={user} signOut={signOut} />
  )
}

export default App;
