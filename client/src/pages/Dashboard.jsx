import {
  TrendingUp,
  Package,
  MessageSquare,
  Sparkles,
  DollarSign,
  ShoppingCart,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    icon: DollarSign,
  },
  {
    title: "Products",
    value: "2,350",
    change: "+180",
    icon: Package,
  },
  {
    title: "Active Orders",
    value: "573",
    change: "+12%",
    icon: ShoppingCart,
  },
  {
    title: "AI Conversations",
    value: "1,284",
    change: "+48",
    icon: MessageSquare,
  },
];

const recentActivity = [
  {
    title: "AI Generated Product Metadata",
    description: "Organic Cotton T-Shirt categorized successfully",
    time: "2 minutes ago",
    icon: Sparkles,
  },
  {
    title: "Customer Support Resolved",
    description: "Order #ORD-2847 inquiry handled by AI bot",
    time: "15 minutes ago",
    icon: MessageSquare,
  },
  {
    title: "New Product Added",
    description: "Bamboo Fiber Yoga Mat added to catalog",
    time: "1 hour ago",
    icon: Package,
  },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard
        </h1>

        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white p-6 rounded-lg shadow-sm border"
            >
              <div className="flex items-center justify-between mb-4">

                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>

                <span className="text-green-700 border border-green-300 text-xs px-2 py-1 rounded flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>

              </div>

              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>

              <p className="text-sm text-gray-500">
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Activity + AI Performance */}
      <div className="grid grid-cols-2 gap-6">

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            Recent Activity
          </h2>

          <div className="space-y-4">
            {recentActivity.map((activity, i) => {
              const Icon = activity.icon;

              return (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-green-600" />
                  </div>

                  <div>
                    <p className="font-medium text-gray-900">
                      {activity.title}
                    </p>

                    <p className="text-sm text-gray-500">
                      {activity.description}
                    </p>

                    <p className="text-xs text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Performance */}
        <div className="bg-white rounded-lg border shadow-sm p-6">

          <h2 className="text-lg font-semibold mb-4">
            AI Performance
          </h2>

          {[
            { name: "Product Categorization", value: 94 },
            { name: "Support Bot Resolution", value: 87 },
            { name: "Customer Satisfaction", value: 92 },
          ].map((item) => (
            <div key={item.name} className="mb-4">

              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">
                  {item.name}
                </span>

                <span className="font-medium">
                  {item.value}%
                </span>
              </div>

              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${item.value}%` }}
                />
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}