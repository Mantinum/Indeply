import React, { useState, useEffect } from 'react';
import { UserRole } from './types/user';
import ClientLayout from './layouts/ClientLayout';
import ProfessionalLayout from './layouts/ProfessionalLayout';
import AuthLayout from './layouts/AuthLayout';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import { getCurrentUser, signOut } from './utils/auth';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getCurrentUser();
        if (userData?.profile) {
          setIsAuthenticated(true);
          setUserRole(userData.profile.role);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUserRole(null);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <AuthLayout>
        {isRegistering ? (
          <RegisterForm 
            onSuccess={(role) => {
              setIsAuthenticated(true);
              setUserRole(role);
            }}
            onCancel={() => setIsRegistering(false)}
          />
        ) : (
          <LoginForm 
            onSuccess={(role) => {
              setIsAuthenticated(true);
              setUserRole(role);
            }}
            onRegister={() => setIsRegistering(true)}
          />
        )}
      </AuthLayout>
    );
  }

  return userRole === 'professional' ? (
    <ProfessionalLayout onLogout={handleLogout} />
  ) : (
    <ClientLayout onLogout={handleLogout} />
  );
};

export default App;