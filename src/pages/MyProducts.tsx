import React, {useEffect} from "react";
import {useProducts} from "../hooks/useProducts";
import {Layout} from "../components/layout/Layout";
import {NftCard} from "../components/products/NftCard.tsx";

export const MyProducts: React.FC = () => {
    const {
        myProducts,
        loading,
        loadingProductIds,
        error,
        loadMyProducts,
        unlistProduct,
        listProduct,
    } = useProducts();

    useEffect(() => {
        loadMyProducts();
    }, [loadMyProducts]);

    if (loading) {
        return (
            <Layout>
                <div className="text-center">Loading your products...</div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="text-center text-red-500">{error}</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">My Products</h1>
                    <button
                        onClick={() => loadMyProducts()}
                        className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                    >
                        Refresh
                    </button>
                </div>
                {myProducts.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-lg shadow">
                        <p className="text-gray-500">You don't own any products yet.</p>
                        <p className="text-gray-500 mt-1">
                            Visit the marketplace to buy some products!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myProducts &&
                            myProducts.map((product) => (
                                <NftCard
                                    key={product.id}
                                    product={product}
                                    onSell={
                                        product.listings.length > 0
                                            ? () => unlistProduct(product.listings[0].id)
                                            : undefined
                                    }
                                    onList={
                                        product.listings.length === 0
                                            ? () => listProduct(product.id)
                                            : undefined
                                    }
                                    showActions={true}
                                    isSelling={product.listings[0]?.id ? loadingProductIds.has(product.listings[0].id) : false}
                                />
                            ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};
