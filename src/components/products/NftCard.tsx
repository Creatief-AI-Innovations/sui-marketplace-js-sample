import React from 'react';
import { Product } from '@creatief/suisdk';

interface NftCardProps {
  product: Product;
  onSell?: () => void;
  onList?: () => void;
  showActions?: boolean;
  isSelling?: boolean;
}

export const NftCard: React.FC<NftCardProps> = ({
  product,
  onSell,
  onList,
  showActions = true,
  isSelling = false,
}) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-gray-800 text-white">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={product.media_url}
          alt={product.name}
          className="object-cover w-full h-48"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        {product.listings.length > 0 && (
          <p className="text-gray-400 mt-1">{(product.listings[0].price / 1e9).toFixed(2)} SUI</p>
        )}

        {showActions && (
          <div className="mt-4 space-x-2">
            {onSell && (
              <button
                onClick={onSell}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium"
                disabled={isSelling}
              >
                {isSelling ? 'Selling...' : 'Sell'}
              </button>
            )}
            {onList && (
              <button
                onClick={onList}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm font-medium"
              >
                List
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};