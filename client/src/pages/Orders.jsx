import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../redux/orderSlice.js";

export default function Orders() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Orders</h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Track and manage customer orders
        </p>
      </div>

      <div className="hidden md:block bg-white shadow rounded-lg p-4 sm:p-6">
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2 px-2">Order ID</th>
                  <th className="px-2">Customer</th>
                  <th className="px-2">Items</th>
                  <th className="px-2">Total</th>
                  <th className="px-2">Status</th>
                  <th className="px-2">Delivery</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="py-2 px-2 font-medium whitespace-nowrap">{order.orderId}</td>
                    <td className="px-2 whitespace-nowrap">{order.user?.name || "Customer"}</td>
                    <td className="px-2 whitespace-nowrap">{order.items || 0}</td>
                    <td className="px-2 whitespace-nowrap">${order.totalAmount}</td>
                    <td className="px-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{order.status}</span>
                    </td>
                    <td className="px-2 whitespace-nowrap">
                      {order.estimatedDelivery
                        ? new Date(order.estimatedDelivery).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="md:hidden space-y-4">
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium text-gray-900">{order.orderId}</p>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{order.status}</span>
              </div>
              <p className="text-gray-700 text-sm">Customer: {order.user?.name || "Customer"}</p>
              <p className="text-gray-700 text-sm">Items: {order.items || 0}</p>
              <p className="text-gray-700 text-sm">Total: ${order.totalAmount}</p>
              <p className="text-gray-500 text-xs mt-1">
                Delivery: {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : "-"}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}