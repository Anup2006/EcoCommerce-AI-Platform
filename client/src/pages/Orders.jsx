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
    <div className="p-6">

      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          Orders
        </h1>
        <p className="text-gray-600">
          Track and manage customer orders
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">

        {loading ? (
          <p>Loading orders...</p>
        ) : (

          <table className="w-full">

            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Delivery</th>
              </tr>
            </thead>

            <tbody>

              {orders.map((order) => (

                <tr key={order._id} className="border-b">

                  <td className="py-2 font-medium">
                    {order.orderId}
                  </td>

                  <td>{order.user?.name || "Customer"}</td>

                  <td>{order.items || 0}</td>

                  <td>${order.totalAmount}</td>

                  <td>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {order.status}
                    </span>
                  </td>

                  <td>
                    {order.estimatedDelivery
                      ? new Date(order.estimatedDelivery).toLocaleDateString()
                      : "-"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>
    </div>
  );
}