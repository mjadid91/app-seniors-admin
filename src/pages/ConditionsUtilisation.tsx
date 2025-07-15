
import Footer from "../components/layout/Footer";

const ConditionsUtilisation = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">Conditions d'utilisation</h1>
          
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold mb-4">1. Objet</h2>
            <p className="mb-4">
              Les présentes conditions générales d'utilisation régissent l'utilisation de la plateforme AppSeniors Admin.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">2. Accès au service</h2>
            <p className="mb-4">
              L'accès à notre plateforme est réservé aux professionnels autorisés et aux partenaires agréés.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">3. Obligations de l'utilisateur</h2>
            <p className="mb-4">
              L'utilisateur s'engage à utiliser la plateforme dans le respect des lois en vigueur et des règles de déontologie professionnelle.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">4. Responsabilité</h2>
            <p className="mb-4">
              AppSeniors met tout en œuvre pour assurer la continuité et la sécurité de ses services, mais ne peut garantir l'absence totale d'interruptions.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConditionsUtilisation;
