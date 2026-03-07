import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/aiProductMetadataSlice.js";
import { useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";

export default function Products() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { products, loading } = useSelector((state) => state.productMetadata);

    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const filteredProducts = products.filter((product) => {
        const titleMatch = product.title
            ?.toLowerCase()
            .includes(search.toLowerCase());

        const seoMatch = product.seoTags?.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
        );

        return titleMatch || seoMatch;
    });

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Products
                    </h1>
                    <p className="text-gray-600">
                        Manage your sustainable product catalog
                    </p>
                </div>

                <button
                    onClick={() =>navigate("/app/ai-product-generator")}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                    <Plus size={16} />
                    Add Product
                </button>
            </div>

            <div className="mb-4 relative max-w-md">
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-9 pr-3 py-2 border rounded-md bg-gray-50"
                    value={search}
                    onChange={(e) =>setSearch(e.target.value)}
                />
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr className="text-left text-sm text-gray-600">
                            <th className="p-4">Product</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Material</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Generated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                        <tr>
                            <td
                                colSpan="5"
                                className="p-6 text-center"
                                >
                                Loading products...
                            </td>
                        </tr>
                        )}

                        {!loading &&
                        filteredProducts.map((product) => (
                            <tr
                                key={product._id}
                                className="border-b hover:bg-gray-50"
                            >

                            <td className="p-4 font-medium">
                                {product.title}
                            </td>

                            <td className="p-4">
                                {product.primaryCategory}
                            </td>

                            <td className="p-4">
                                {product.material}
                            </td>

                            <td className="p-4">
                                ${product.price}
                            </td>

                            <td className="p-4">
                                {new Date(
                                product.generatedAt
                                ).toLocaleDateString()}
                            </td>

                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}