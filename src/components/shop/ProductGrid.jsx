import ProductCard from "./ProductCard";

export default function ProductGrid({productsList, onBuy}) {    
    return(
        <div className="grid">
            {/* Percorre a lista de produtos */}
            {productsList.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onBuy={onBuy}
                />
            ))}
        </div>
    );
}
