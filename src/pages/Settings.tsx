import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Briefcase, MapPin } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { PROFESSIONS } from '../types/profession';

export default function Settings() {
  const { profile, loading, error, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profession: '',
    businessName: '',
    businessDescription: '',
    address: '',
    postalCode: '',
    city: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        profession: profile.profession || '',
        businessName: profile.business_name || '',
        businessDescription: profile.business_description || '',
        address: profile.address || '',
        postalCode: profile.postal_code || '',
        city: profile.city || ''
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        profession: formData.profession,
        business_name: formData.businessName,
        business_description: formData.businessDescription,
        address: formData.address,
        postal_code: formData.postalCode,
        city: formData.city
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          <div className="p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-secondary-900">Paramètres du compte</h2>
            <p className="text-secondary-600">Gérez vos informations personnelles</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  <User className="w-4 h-4 inline-block mr-2" />
                  Prénom
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  <User className="w-4 h-4 inline-block mr-2" />
                  Nom
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                <Mail className="w-4 h-4 inline-block mr-2" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                <Phone className="w-4 h-4 inline-block mr-2" />
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {profile?.role === 'professional' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    <Briefcase className="w-4 h-4 inline-block mr-2" />
                    Profession
                  </label>
                  <select
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Sélectionnez une profession</option>
                    {PROFESSIONS.map(p => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Nom de l'entreprise
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Description de l'activité
                  </label>
                  <textarea
                    value={formData.businessDescription}
                    onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    <MapPin className="w-4 h-4 inline-block mr-2" />
                    Adresse
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Code postal
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Ville
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end gap-3">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-secondary-600 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Enregistrer
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Modifier
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}