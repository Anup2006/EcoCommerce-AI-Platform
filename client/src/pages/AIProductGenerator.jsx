import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sparkles, Loader2, Save } from "lucide-react";
import { generateMetadata, saveProduct,clearMetadata } from "../redux/aiProductMetadataSlice.js";
import { toast } from 'react-toastify';

export default function AIProductGenerator() {
    const dispatch = useDispatch();

    const { metadata, loading, saving } = useSelector((state) => state.productMetadata);

    const [productTitle, setProductTitle] = useState("");
    const [description, setDescription] = useState("");
    const [material, setMaterial] = useState("");
    const [price, setPrice] = useState("");

    const handleGenerate = async () => {
        try {
            await dispatch(
                generateMetadata({title: productTitle,description,material,price,})
            ).unwrap();
            toast.success('Metadata generated!!');
        } catch (err) {
            toast.error(err?.message || 'Failed to generate Metadata!!');
        }
        
    };


    const handleSave = async() => {
        try{
            await dispatch(
                saveProduct({title: productTitle,description,material,price,...metadata})
            ).unwrap();
            toast.success('Product added!!');
            dispatch(clearMetadata());
            setProductTitle("");
            setDescription("");
            setMaterial("");
            setPrice("");
        }catch (err) {
            toast.error(err?.message || 'Failed to add product!!');
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">
                    AI Product Category Generator
                </h1>
                <p className="text-gray-600 mt-1">
                    Automatically generate categories and tags
                </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white border rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        Product Details
                    </h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Product Title"
                            className="w-full border rounded-md p-2"
                            value={productTitle}
                            onChange={(e) => setProductTitle(e.target.value)}
                        />

                        <textarea
                            rows="5"
                            placeholder="Description"
                            className="w-full border rounded-md p-2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Material"
                            className="w-full border rounded-md p-2"
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            className="w-full border rounded-md p-2"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <button
                            onClick={handleGenerate}
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-2 rounded-md flex items-center justify-center gap-2"
                        >

                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                Generate AI Metadata
                            </>
                        )}
                        </button>
                    </div>
                </div>

                <div className="bg-white border rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        AI Generated Metadata
                    </h2>

                    {!metadata ? (

                        <p className="text-gray-500">
                        Generate metadata to see results
                        </p>

                    ) : (
                    <div className="space-y-5">
                        <div>
                            <p className="text-xs text-gray-500 uppercase mb-2">
                                Primary Category
                            </p>
                            <span className="bg-green-600 text-white px-3 py-1 rounded">
                                {metadata.primaryCategory}
                            </span>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 uppercase mb-2">
                                Subcategory
                            </p>
                            <p>{metadata.subCategory}</p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 uppercase mb-2">
                                SEO Tags
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {metadata.seoTags?.map((tag, i) => (
                                    <span
                                    key={i}
                                    className="border px-3 py-1 rounded text-sm"
                                    >
                                    {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase mb-2">
                              Sustainability Filters
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {metadata.sustainabilityFilters?.map((f, i) => (
                                    <span
                                    key={i}
                                    className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm"
                                    >
                                    {f}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full bg-green-600 text-white py-2 rounded-md flex items-center justify-center gap-2"
                        >

                            {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                            ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Product
                            </>
                            )}

                        </button>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}