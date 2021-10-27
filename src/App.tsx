import { AuthenticateedApp } from 'authenticated-app';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { UnauthenticatedApp } from 'unauthenticated-app';
import './App.css';

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {user? <AuthenticateedApp/> : <UnauthenticatedApp/>}
    </div>
  );
}

export default App;
