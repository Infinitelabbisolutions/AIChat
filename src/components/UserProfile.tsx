import React, { useState } from 'react';
import { User, Camera, CreditCard, Package, Lock, Mail, Plus } from 'lucide-react';
import { SubscriptionTier } from '../types';

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    currentPlan: SubscriptionTier;
    credits: number;
  };
  onUpdateProfile: (data: any) => void;
  onUpgradeSubscription: (plan: SubscriptionTier['id']) => void;
  onAddCredits: (amount: number) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onUpdateProfile,
  onUpgradeSubscription,
  onAddCredits,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'subscription' | 'credits'>('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
  });
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(profileData);
    setIsEditingProfile(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (securityData.newPassword === securityData.confirmPassword) {
      onUpdateProfile({ password: securityData.newPassword });
      setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateProfile({ avatarUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const creditPackages = [
    { amount: 100, price: 49.90 },
    { amount: 500, price: 199.90 },
    { amount: 1000, price: 349.90 },
  ];

  const subscriptionTiers: SubscriptionTier[] = [
    {
      id: 'basic',
      name: 'Básico',
      price: 199.90,
      features: ['Até 1.000 páginas por processo', 'Até 10 processos por mês'],
    },
    {
      id: 'pro',
      name: 'Profissional',
      price: 379.90,
      features: ['Até 5.000 páginas por processo', 'Até 50 processos por mês'],
      recommended: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 579.49,
      features: ['Até 20.000 páginas por processo', 'Até 100 processos por mês'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-full h-full p-4 text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-sm cursor-pointer">
                  <Camera className="w-4 h-4 text-gray-600" />
                  <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                </label>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'profile'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Perfil
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'security'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Segurança
            </button>
            <button
              onClick={() => setActiveTab('subscription')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'subscription'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Assinatura
            </button>
            <button
              onClick={() => setActiveTab('credits')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'credits'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Créditos
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    disabled={!isEditingProfile}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    disabled={!isEditingProfile}
                  />
                </div>
                {isEditingProfile ? (
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(true)}
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                  >
                    Editar Perfil
                  </button>
                )}
              </form>
            )}

            {activeTab === 'security' && (
              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                    Senha Atual
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="password"
                      id="currentPassword"
                      value={securityData.currentPassword}
                      onChange={(e) =>
                        setSecurityData({ ...securityData, currentPassword: e.target.value })
                      }
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                    <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    Nova Senha
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="password"
                      id="newPassword"
                      value={securityData.newPassword}
                      onChange={(e) =>
                        setSecurityData({ ...securityData, newPassword: e.target.value })
                      }
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                    <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirmar Nova Senha
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      value={securityData.confirmPassword}
                      onChange={(e) =>
                        setSecurityData({ ...securityData, confirmPassword: e.target.value })
                      }
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                    <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Alterar Senha
                </button>
              </form>
            )}

            {activeTab === 'subscription' && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Plano Atual</h3>
                      <p className="text-sm text-gray-600">{user.currentPlan.name}</p>
                    </div>
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {subscriptionTiers.map((tier) => (
                    <div
                      key={tier.id}
                      className={`p-6 rounded-xl border ${
                        tier.recommended
                          ? 'border-blue-600 ring-2 ring-blue-600 ring-opacity-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                      <p className="mt-2 text-2xl font-bold text-gray-900">
                        R$ {tier.price.toFixed(2)}
                        <span className="text-sm font-normal text-gray-500">/mês</span>
                      </p>
                      <ul className="mt-4 space-y-2">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <Plus className="h-4 w-4 text-blue-600 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => onUpgradeSubscription(tier.id)}
                        className={`mt-6 w-full py-2 rounded-lg ${
                          user.currentPlan.id === tier.id
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                        disabled={user.currentPlan.id === tier.id}
                      >
                        {user.currentPlan.id === tier.id ? 'Plano Atual' : 'Alterar Plano'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'credits' && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Créditos Disponíveis</h3>
                      <p className="text-2xl font-bold text-blue-600">{user.credits} créditos</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-blue-600" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {creditPackages.map((pkg, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-xl border border-gray-200 hover:border-blue-600 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">{pkg.amount} Créditos</h3>
                      <p className="mt-2 text-2xl font-bold text-gray-900">
                        R$ {pkg.price.toFixed(2)}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        {(pkg.price / pkg.amount).toFixed(2)} por crédito
                      </p>
                      <button
                        onClick={() => onAddCredits(pkg.amount)}
                        className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Comprar Créditos
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;