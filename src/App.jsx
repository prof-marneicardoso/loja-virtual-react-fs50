import Section from "./components/ui/Section";
import ProductGrid from "./components/shop/ProductGrid.jsx";

export default function App({productsList: products}) {
  function handleBuy(product) {
    alert(`(Etapa 1) Comprar: ${product.name}`);
  }
  
  return(
    <div className="page">
      <header className="top">
        <h2>Buenas Shop</h2>

        <p className="muted">
          Etapa 1: props + children + MockAPI (sem hooks)
        </p>
      </header>

      <Section title="Produtos" subtitle="Cards gerados via map()">
        <ProductGrid productsList={products} onBuy={handleBuy} />
      </Section>

      <Section title="Carrinho" subtitle="Somente UI/Placeholder">
        <p className="muted">Carrinho vazio</p>
      </Section>
    </div>
  );
}
