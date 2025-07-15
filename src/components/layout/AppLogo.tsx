
export const AppLogo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-lg">AS</span>
      </div>
      <div>
        <h1 className="font-bold text-gray-900 text-lg">AppSeniors</h1>
        <p className="text-sm text-gray-500 -mt-1">Administration</p>
      </div>
    </div>
  );
};
