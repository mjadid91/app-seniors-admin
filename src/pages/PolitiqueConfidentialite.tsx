
import Footer from "../components/layout/Footer";

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">Politique de confidentialité</h1>
          
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold mb-4">1. Collecte des données</h2>
            <p className="mb-4">
              Nous collectons uniquement les données nécessaires au fonctionnement de notre plateforme et à l'amélioration de nos services.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">2. Utilisation des données</h2>
            <p className="mb-4">
              Vos données sont utilisées pour vous fournir nos services, améliorer votre expérience et vous tenir informé des évolutions de notre plateforme.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">3. Protection des données</h2>
            <p className="mb-4">
              Nous mettons en place toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données personnelles.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">4. Vos droits</h2>
            <p className="mb-4">
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialite;
