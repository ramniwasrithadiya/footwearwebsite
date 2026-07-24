const fs = require('fs');
let code = fs.readFileSync('src/pages/ProductDetail.tsx', 'utf8');

const sizeButtons = `<div className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-1">
              {product.sizes.filter(size => size >= 37 && size <= 42).map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={\`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-sm border \${selectedSize === size ? 'border-rose-400 text-white bg-rose-400' : 'border-rose-200 text-rose-950 hover:border-rose-400'} transition-colors\`}
                >
                  {size}
                </button>
              ))}
            </div>`;

const targetReplacement = `<div className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-1">
              {product.sizes.filter(size => size >= 37 && size <= 42).map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={\`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-sm border \${selectedSize === size ? 'border-rose-400 text-white bg-rose-400' : 'border-rose-200 text-rose-950 hover:border-rose-400'} transition-colors\`}
                >
                  {size}
                </button>
              ))}
            </div>
            {(() => {
              const stockItem = product.stock?.find(s => s.size === selectedSize);
              const qty = stockItem ? stockItem.quantity : 0;
              if (qty === 0) return <p className="text-red-500 mt-2 text-sm font-medium">Out of Stock</p>;
              if (qty >= 1 && qty <= 5) return <p className="text-orange-500 mt-2 text-sm font-medium">Only {qty} pairs left</p>;
              if (qty >= 6 && qty <= 10) return <p className="text-yellow-600 mt-2 text-sm font-medium">Limited Stock</p>;
              return <p className="text-green-600 mt-2 text-sm font-medium">In Stock</p>;
            })()}`;

code = code.replace(sizeButtons, targetReplacement);

// Disable "Add to Bag" button if qty is 0, and limit quantity selection to available stock
code = code.replace(
  "onClick={() => setQuantity(quantity + 1)}",
  "onClick={() => { const stockItem = product.stock?.find(s => s.size === selectedSize); const maxQty = stockItem ? stockItem.quantity : 0; if (quantity < maxQty) setQuantity(quantity + 1); }}"
);

code = code.replace(
  "onClick={handleAddToCart}\n              disabled={added}",
  "onClick={handleAddToCart}\n              disabled={added || (() => { const stockItem = product.stock?.find(s => s.size === selectedSize); return !stockItem || stockItem.quantity === 0; })()}"
);

fs.writeFileSync('src/pages/ProductDetail.tsx', code);
