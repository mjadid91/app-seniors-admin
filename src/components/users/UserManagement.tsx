
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Eye, Edit, UserX } from "lucide-react";

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: 'senior' | 'aidant' | 'administrateur' | 'moderateur' | 'support';
  statut: 'actif' | 'inactif' | 'suspendu';
  dateInscription: string;
  photo?: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    nom: 'Dupont',
    prenom: 'Marie',
    email: 'marie.dupont@email.com',
    role: 'senior',
    statut: 'actif',
    dateInscription: '2024-01-15'
  },
  {
    id: '2',
    nom: 'Martin',
    prenom: 'Jean',
    email: 'jean.martin@email.com',
    role: 'aidant',
    statut: 'actif',
    dateInscription: '2024-02-10'
  },
  {
    id: '3',
    nom: 'Bernard',
    prenom: 'Sophie',
    email: 'sophie.bernard@email.com',
    role: 'senior',
    statut: 'inactif',
    dateInscription: '2024-01-28'
  }
];

const UserManagement = () => {
  const [users] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("tous");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "tous" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'administrateur': return 'bg-red-100 text-red-700 border-red-200';
      case 'moderateur': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'support': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'senior': return 'bg-green-100 text-green-700 border-green-200';
      case 'aidant': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatutBadgeColor = (statut: string) => {
    switch (statut) {
      case 'actif': return 'bg-green-100 text-green-700 border-green-200';
      case 'inactif': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'suspendu': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Gestion des utilisateurs</h2>
          <p className="text-slate-600 mt-1">Gérer tous les comptes utilisateurs de la plateforme</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un utilisateur
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtres et recherche</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par nom, prénom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="tous">Tous les rôles</option>
              <option value="senior">Senior</option>
              <option value="aidant">Aidant</option>
              <option value="administrateur">Administrateur</option>
              <option value="moderateur">Modérateur</option>
              <option value="support">Support</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Utilisateur</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Rôle</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Statut</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Inscription</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.prenom[0]}{user.nom[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{user.prenom} {user.nom}</p>
                          <p className="text-sm text-slate-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600">{user.email}</td>
                    <td className="py-4 px-4">
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatutBadgeColor(user.statut)}>
                        {user.statut}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {new Date(user.dateInscription).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <UserX className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
