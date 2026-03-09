import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../redux/dashboardSlice.js";
import {
  Package,
  MessageSquare,
  Sparkles,
  DollarSign,
  ShoppingCart,
} from "lucide-react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats, recentActivity, loading } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  const iconMap = {
    DollarSign,
    Package,
    ShoppingCart,
    MessageSquare,
    Sparkles,
  };

  function ActivityItem({ title, description, time, Icon }) {
    const [expanded, setExpanded] = useState(false);
    const limit = 60; 

    const shouldTruncate = description.length > limit;

    return (
      <div className="flex gap-3 sm:gap-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-50 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
        </div>

        <div>
          <p className="font-medium text-gray-900 text-sm sm:text-base">{title}</p>
          <p className="text-xs sm:text-sm text-gray-500">
            {shouldTruncate && !expanded
              ? description.slice(0, limit) + "..."
              : description}
            {shouldTruncate && (
              <button
                className="ml-1 text-xs text-green-600 underline"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "View Less" : "View More"}
              </button>
            )}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-400">{time}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-1">
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon] || Package;

          return (
            <div
              key={stat.title}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>

              <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p className="text-sm sm:text-base text-gray-500">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Recent Activity
          </h2>

          {loading ? (
            <p>Loading activity...</p>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity, i) => {
                const Icon = iconMap[activity.icon] || MessageSquare;
                return (
                  <ActivityItem
                    key={i}
                    title={activity.title}
                    description={activity.description}
                    time={activity.time}
                    Icon={Icon}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}