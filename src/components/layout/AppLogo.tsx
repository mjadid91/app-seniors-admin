
export const AppLogo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-lg">AS</span>
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold text-gray-900 text-lg leading-tight">AppSeniors</h1>
        <p className="text-sm text-gray-600 leading-tight">Administration</p>
      </div>
    </div>
  );
};
