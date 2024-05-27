const Loader = () => {
  return (
    <div className="relative w-20 h-24">
      <div className="absolute bottom-0 w-2.5 h-1/2 bg-black origin-bottom scale-y-[0.2] left-0 animate-barUp1"></div>
      <div className="absolute bottom-0 w-2.5 h-1/2 bg-black origin-bottom scale-y-[0.4] left-3.5 animate-barUp2"></div>
      <div className="absolute bottom-0 w-2.5 h-1/2 bg-black origin-bottom scale-y-[0.6] left-[30px] animate-barUp3"></div>
      <div className="absolute bottom-0 w-2.5 h-1/2 bg-black origin-bottom scale-y-[0.8] left-[45px] animate-barUp4"></div>
      <div className="absolute bottom-0 w-2.5 h-1/2 bg-black origin-bottom scale-y-[1] left-[60px] animate-barUp5"></div>
      <div className="absolute bottom-[10px] left-0 w-2.5 h-2.5 bg-blue-500 rounded-full animate-ball624"></div>
    </div>
  );
};

export default Loader;
