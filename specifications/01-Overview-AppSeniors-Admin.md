
# 📋 Spécifications Techniques - AppSeniors Admin

## 🎯 Vue d'ensemble générale

### Architecture de l'application
- **Frontend** : React + TypeScript + Tailwind CSS
- **Backend** : Supabase (PostgreSQL + API REST auto-générée)
- **Authentification** : Supabase Auth
- **Storage** : Supabase Storage (buckets)
- **UI Components** : Shadcn/UI

### Structure des rôles utilisateurs
| Rôle | ID Catégorie | Accès |
|------|-------------|--------|
| Administrateur | 5 | Accès complet à toutes les fonctionnalités |
| Modérateur | 6 | Modération uniquement |
| Support | 8 | Support client uniquement |
| Visualisateur | 7 | Lecture seule sur toutes les pages |

### Pages principales de l'application
1. **Dashboard** - Vue d'ensemble et statistiques
2. **Utilisateurs** - Gestion des utilisateurs (Admins, Seniors, Aidants)
3. **Prestations** - Services et suivi des prestations
4. **Partenaires** - Gestion des partenaires et bons plans
5. **Finances** - Transactions et commissions
6. **Modération** - Surveillance des contenus
7. **Support** - Tickets de support client
8. **Documents** - Gestion documentaire
9. **RGPD** - Conformité et demandes RGPD
10. **Paramètres** - Configuration utilisateur

### Conventions API
- **Base URL** : Auto-générée par Supabase
- **Authentification** : Bearer Token (JWT)
- **Format** : JSON
- **Codes de retour** : Standards HTTP (200, 201, 400, 401, 403, 404, 500)

### Règles de sécurité générales
- **RLS (Row Level Security)** activée sur toutes les tables sensibles
- **Permissions basées sur les rôles** via hooks personnalisés
- **Validation côté client ET serveur**
- **Audit trail** pour les actions critiques
