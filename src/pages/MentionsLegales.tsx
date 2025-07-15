
import Footer from "../components/layout/Footer";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">Mentions légales</h1>
          
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold mb-4">1. Éditeur du site</h2>
            <p className="mb-4">
              Le site AppSeniors Admin est édité par la société AppSeniors, société par actions simplifiée au capital de 10 000 euros.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">2. Directeur de la publication</h2>
            <p className="mb-4">
              Le directeur de la publication est le représentant légal de la société AppSeniors.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">3. Hébergement</h2>
            <p className="mb-4">
              Le site est hébergé par un prestataire français conforme aux normes européennes de protection des données.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">4. Propriété intellectuelle</h2>
            <p className="mb-4">
              L'ensemble des contenus présents sur ce site (textes, images, logos) sont protégés par le droit d'auteur.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
