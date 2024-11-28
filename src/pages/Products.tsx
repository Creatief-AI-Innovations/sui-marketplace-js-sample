import React, { useEffect, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/products/ProductCard';
import { Layout } from '../components/layout/Layout';

export const Products: React.FC = () => {
  const { products, loading, loadingProductIds, error, loadProducts, buyProduct } = useProducts();
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await loadProducts();
        console.log('Products loaded', products);
      } catch (err) {
        console.error('Failed to load products', err);
      }
    };

    fetchProducts();
  }, [loadProducts]);

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedProducts = filteredProducts?.sort((a, b) => {
    if (sort === 'price-asc') {
      return a.price - b.price;
    } else if (sort === 'price-desc') {
      return b.price - a.price;
    }
    return 0;
  });

  if (loading) {
    return (
      <Layout>
        <div className="text-center">Loading products...</div>
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Marketplace</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-md text-black"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border rounded-md text-black">
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {sortedProducts && sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onBuy={() => buyProduct(product.id)}
            isBuying={loadingProductIds.has(product.id)}
          />
        ))}
      </div>
    </Layout>
  );
};