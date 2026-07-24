const fs = require('fs');
let code = fs.readFileSync('src/CartContext.tsx', 'utf8');
code = code.replace("removeFromCart: (index: number) => void;", "removeFromCart: (index: number) => void;\n  clearCart: () => void;");
code = code.replace("const removeFromCart = (index: number) => {", "const clearCart = () => setItems([]);\n  const removeFromCart = (index: number) => {");
code = code.replace("value={{ items, addToCart, removeFromCart, isCartOpen, setIsCartOpen }}", "value={{ items, addToCart, removeFromCart, clearCart, isCartOpen, setIsCartOpen }}");
fs.writeFileSync('src/CartContext.tsx', code);
