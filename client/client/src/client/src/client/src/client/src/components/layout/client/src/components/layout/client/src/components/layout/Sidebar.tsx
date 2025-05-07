import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export const Sidebar = () => {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return null;
  }
  
  return (
    <div className="hidden md:flex flex-col w-64 border-r border-gray-800 bg-dark-lighter overflow-y-auto">
      <div className="p-6">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-gradient">MSport</span>
          <span>Predictor</span>
        </h1>
      </div>
      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-1">
          <li>
            <Link href="/" className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
              location === "/" 
                ? "bg-primary text-black" 
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            )}>
              <i className={cn("fas fa-chart-line", location === "/" ? "text-black" : "text-gray-400")}></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/matches" className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
              location === "/matches" 
                ? "bg-primary text-black" 
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            )}>
              <i className={cn("fas fa-futbol", location === "/matches" ? "text-black" : "text-gray-400")}></i>
              <span>Matches</span>
            </Link>
          </li>
          <li>
            <Link href="/history" className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
              location === "/history" 
                ? "bg-primary text-black" 
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            )}>
              <i className={cn("fas fa-history", location === "/history" ? "text-black" : "text-gray-400")}></i>
              <span>History</span>
            </Link>
          </li>
          <li>
            <Link href="/settings" className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
              location === "/settings" 
                ? "bg-primary text-black" 
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            )}>
              <i className={cn("fas fa-cog", location === "/settings" ? "text-black" : "text-gray-400")}></i>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto p-4 border-t border-gray-800">
        <div className="rounded-lg bg-dark p-3">
          <h3 className="font-medium mb-1">Pro Tip</h3>
          <p className="text-sm text-gray-400 mb-2">
            Look for predictions with 85%+ confidence for best results.
          </p>
          <div className="text-xs text-primary">More tips</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
