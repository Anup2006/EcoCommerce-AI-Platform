import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Sparkles,
  ShoppingCart,
  MessageSquare,
  FileText,
  Settings,
  Search,
  Bell,
  User
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/app" },
  { icon: Package, label: "Products", path: "/app/products" },
  { icon: Sparkles, label: "AI Product Generator", path: "/app/ai-product-generator" },
  { icon: MessageSquare, label: "AI Support Bot", path: "/app/ai-support-bot" },
  { icon: FileText, label: "AI Logs", path: "/app/ai-logs" },
  { icon: Settings, label: "Settings", path: "/app/settings" },
];

export default function DashboardLayout() {

  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">

      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white w-5 h-5"/>
            </div>
            <span className="font-semibold text-gray-800">
              EcoCommerce AI
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {

            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                  active
                    ? "bg-green-100 text-green-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5"/>
                <span className="text-sm">{item.label}</span>
              </Link>
            );

          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">
              AD
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">
                Admin User
              </p>
              <p className="text-xs text-gray-500">
                admin@eco.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">

          <div className="relative w-96">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400"/>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 border rounded-lg bg-gray-50"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white">
              <User size={18}/>
            </div>

          </div>

        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}