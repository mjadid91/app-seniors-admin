
export const AppLogo = () => {
  return (
    <div className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-app-primary to-app-secondary rounded-xl flex items-center justify-center shadow-elegant group-hover:shadow-elegant-md transition-all duration-300 group-hover:scale-105">
          <span className="text-white font-bold text-lg drop-shadow-sm">AS</span>
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-app-primary to-app-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md"></div>
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold text-foreground text-lg leading-tight group-hover:text-app-primary transition-colors duration-200">
          AppSeniors
        </h1>
        <p className="text-sm text-app-text-light leading-tight">
          Administration
        </p>
      </div>
    </div>
  );
};
