import { NavLink } from 'react-router-dom';
import { 
  BookCheck, 
  Briefcase, 
  Users, 
  Settings, 
  BarChart3, 
  Workflow, 
  FileText,
  Upload,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';
import { roles } from '../../constants/roles';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const { user } = useAuth();

  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: <BarChart3 className="h-5 w-5" />,
      roles: [roles.ADMIN, roles.ADVOCATE]
    },
    { 
      name: 'Portfolio', 
      path: '/portfolio', 
      icon: <Briefcase className="h-5 w-5" />,
      roles: [roles.ADMIN]
    },
    { 
      name: 'User Management', 
      path: '/user-management', 
      icon: <Users className="h-5 w-5" />,
      roles: [roles.ADMIN]
    },
    { 
      name: 'Workflow', 
      path: '/workflow', 
      icon: <Workflow className="h-5 w-5" />,
      roles: [roles.ADMIN]
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: <Settings className="h-5 w-5" />,
      roles: [roles.ADMIN]
    },
    { 
      name: 'Reports', 
      path: '/reports', 
      icon: <FileText className="h-5 w-5" />,
      roles: [roles.ADMIN, roles.ADVOCATE]
    },
    { 
      name: 'eTSR (beta)', 
      path: '/etsr', 
      icon: <Upload className="h-5 w-5" />,
      roles: [roles.ADMIN]
    },
    { 
      name: 'Advocate Panel', 
      path: '/advocate-panel', 
      icon: <BookCheck className="h-5 w-5" />,
      roles: [roles.ADVOCATE]
    },
    { 
      name: 'Documents', 
      path: '/documents', 
      icon: <FileText className="h-5 w-5" />,
      roles: [roles.BORROWER]
    },
  ];

  const filteredNavItems = user 
    ? navItems.filter(item => item.roles.includes(user.role as any))
    : [];

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        open ? "w-64" : "w-20"
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <div className={cn("flex items-center", !open && "justify-center")}>
          <div className="p-1 rounded-lg bg-primary/10">
            <BookCheck className="h-6 w-6 text-primary" />
          </div>
          {open && <span className="ml-2 font-bold text-lg">Loanlens</span>}
        </div>
        <button 
          onClick={() => setOpen(!open)}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          {open ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {filteredNavItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 rounded-md transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100",
                    !open && "justify-center"
                  )
                }
                title={!open ? item.name : undefined}
              >
                {item.icon}
                {open && <span className="ml-3">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        {user && (
          <div className={cn("flex items-center", !open && "justify-center")}>
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            {open && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-gray-700 truncate">{user.name || "User"}</p>
                <p className="text-xs text-gray-500 truncate">{user.email || user.mobile}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;