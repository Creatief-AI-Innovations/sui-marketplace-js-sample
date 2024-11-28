import {useState, useCallback} from 'react';
import {toast} from 'react-toastify';
import {Product} from '@creatief/suisdk';
import {marketplaceApi} from '../api/marketplaceApi';

const collectionId = import.meta.env.VITE_COLLECTION_ID as string;

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [myProducts, setMyProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingProductIds, setLoadingProductIds] = useState<Set<string>>(new Set());
    const [error, setError] = useState<string | null>(null);

    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await marketplaceApi.products.getAllProducts(collectionId);
            console.log('Products:', data);
            setProducts(data);
        } catch (err) {
            setError('Failed to load products');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const loadMyProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await marketplaceApi.products.getOwned();
            setMyProducts(data);
        } catch (err) {
            setError('Failed to load your products');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const buyProduct = useCallback(async (productId: string) => {
        setError(null);
        setLoadingProductIds((prev) => new Set(prev).add(productId));
        try {
            const response = await marketplaceApi.transactions.buyProduct(productId);
            if (response.success) {
                setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
                toast.success('Product bought successfully');
            } else {
                console.error('Failed to buy product', response);
                toast.error(response.message);
            }
        } catch (err) {
            console.error('Failed to buy product', err);
            toast.error('Failed to buy product');
        } finally {
            setLoadingProductIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });
        }
    }, []);

    const unlistProduct = useCallback(async (productId: string) => {
        setError(null);
        setLoadingProductIds((prev) => new Set(prev).add(productId));
        try {
            console.log('Selling product', productId);
            const response = await marketplaceApi.transactions.unlistProduct(productId);
            if (response.success) {
                setMyProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
                toast.success('Product sold successfully');
            } else {
                console.error('Failed to sell product', response);
                toast.error(response.message);
            }
            // await loadProducts();
            // await loadMyProducts();
        } catch (err) {
            toast.error(String(err));
            // setError('Failed to sell product');
            console.error(err);
            throw err;
        } finally {
            setLoadingProductIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });
        }
    }, [loadProducts, loadMyProducts]);

    const listProduct = useCallback(async (productId: string) => {
        setError(null);
        setLoadingProductIds((prev) => new Set(prev).add(productId));
        try {
            console.log('Listing product', productId);
            const response = await marketplaceApi.transactions.listProduct(productId,2000000000);
            if (response.success) {
                setMyProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
                toast.success('Product listed successfully');
            } else {
                console.error('Failed to list product', response);
                toast.error(response.message);
            }
            // await loadProducts();
            // await loadMyProducts();
        } catch (err) {
            toast.error(String(err));
            // setError('Failed to sell product');
            console.error(err);
            throw err;
        } finally {
            setLoadingProductIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });
        }
    }, [loadProducts, loadMyProducts]);

    return {
        products,
        myProducts,
        loading,
        loadingProductIds,
        error,
        loadProducts,
        loadMyProducts,
        buyProduct,
        unlistProduct,
        listProduct,
    };
};

/*
import {useState, useCallback} from 'react';
import { toast } from 'react-toastify';
import {Product} from '@creatief/suisdk';
import {marketplaceApi} from '../api/marketplaceApi';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [myProducts, setMyProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await marketplaceApi.products.getAllProducts("de36d429-35aa-412f-9762-ceea83ae320a");
            console.log('Products:', data);
            setProducts(data);
        } catch (err) {
            setError('Failed to load products');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const loadMyProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await marketplaceApi.products.getMyProducts();
            setMyProducts(data);
        } catch (err) {
            setError('Failed to load your products');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const buyProduct = useCallback(async (productId: string) => {
        setError(null);
        setLoadingProductId(productId);
        try {
            const response = await marketplaceApi.transactions.buyProduct(productId);
            if (response.success) {
                // await loadProducts(); // Refresh products after purchase
                // remove bought product from products
                setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));

            } else {
                console.error('failed to buy product', response);
                // setError('Failed to buy product');
                toast.error(response.message);
            }
            // await loadMyProducts(); // Refresh my products after purchase
        } catch (err) {
            // setError('Failed to buy product');
            console.error(err);
            // throw err;
        } finally {
            setLoadingProductId(null);
        }
    }, [loadProducts, loadMyProducts]);

    const sellProduct = useCallback(async (productId: string) => {
        setError(null);
        try {
            await marketplaceApi.transactions.sellProduct(productId);
            await loadProducts(); // Refresh products after sale
            await loadMyProducts(); // Refresh my products after sale
        } catch (err) {
            setError('Failed to sell product');
            console.error(err);
            throw err;
        }
    }, [loadProducts, loadMyProducts]);

    return {
        products,
        myProducts,
        loading,
        error,
        loadProducts,
        loadMyProducts,
        buyProduct,
        sellProduct,
    };
};*/
