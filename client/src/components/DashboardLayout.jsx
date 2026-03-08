import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Sparkles,
  ShoppingCart,
  MessageSquare,
  FileText,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../redux/authSlice.js';
import { toast } from "react-toastify";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/app" },
  { icon: Package, label: "Products", path: "/app/products" },
  { icon: Sparkles, label: "AI Product Generator", path: "/app/ai-product-generator" },
  { icon: ShoppingCart, label: "Orders", path: "/app/orders" },
  { icon: MessageSquare, label: "AI Support Bot", path: "/app/ai-support-bot" },
  { icon: FileText, label: "AI Logs", path: "/app/ai-logs" },
];

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser())
      .unwrap()
      .then(() => {
        toast.success("Logged out!!", { position: "top-right", autoClose: 3000 });
      });
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r flex flex-col transform transition-transform duration-300
                      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex`}>
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white w-5 h-5"/>
            </div>
            <span className="font-semibold text-gray-800">EcoCommerce AI</span>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5"/>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)} 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                  active ? "bg-green-100 text-green-700" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5"/>
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user?.fullname?.charAt(0).toUpperCase() || "U"} className="w-10 h-10 object-cover"/>
              ) : (
                <span>{user?.fullname?.charAt(0).toUpperCase() || "U"}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium">{user?.fullname}</p>
              <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col ">
        <div className="md:hidden p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 bg-white rounded-md shadow-md"
          >
            <Menu className="w-6 h-6"/>
          </button>
        </div>

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}