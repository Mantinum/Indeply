import React, { useState, useEffect } from 'react';
import { Home, Users, Calendar, Settings, LogOut, Sparkles, Clock, Euro, FileText } from 'lucide-react';
import { getCurrentUser } from '../utils/auth';

interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onLogout: () => void;
}

export default function Sidebar({ onNavigate, currentPage, onLogout }: SidebarProps) {
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userData = await getCurrentUser();
        if (userData?.profile) {
          setUserProfile(userData.profile);
        }
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
      }
    };

    loadProfile();
  }, []);

  // Rest of the component remains the same...
  return (
    <div className="bg-white border-r border-gray-200 text-secondary-600 w-64 min-h-screen p-4">
      {/* Component content */}
    </div>
  );
}