# BuenasShop — React

Este repositório é um tutorial para construir uma mini loja virtual (e-commerce) em React.

✅ **Etapa 1**: foco total em **props** e **children**, com produtos vindo da **MockAPI**.

✅ **Etapa 2**: adiciona **useState** (carrinho funcional) + **useEffect** (buscar produtos dentro do React).

---

## Pré-requisitos

- Node.js (LTS recomendado)
- NPM (ou Yarn/Pnpm)
- Conta/projeto no MockAPI (ou outro mock REST)
- Thunder Client / Insomnia / Postman (cadastrar produtos)

---

## 0) Criar o projeto React com Vite

No terminal:

```bash
npm create vite@latest buenas-shop

cd buenas-shop
npm install
npm run dev
```

## 1) Preparar a MockAPI (Produtos)

### 1.1 Criar o resource products

No painel da MockAPI:

- Crie um Projeto
- Crie um Resource chamado products

Campos sugeridos:

- name (string)
- price (number)
- tag (string)
- description (string)


---

### 1.2 URL base

```
https://SEU-PROJETO.mockapi.io/api/
```

O endpoint de produtos será:

```
GET https://SEU-PROJETO.mockapi.io/api/products
```


---

### 1.3 Popular com 6 produtos (via Thunder Client / Postman / Insomnia)

Faça 6 requests POST:

```
POST https://SEU-PROJETO.mockapi.io/api/products  
Header: Content-Type: application/json
```

Body (JSON)

```json
{
    "name": "Teclado Mecânico",
    "price": 299.9,
    "tag": "periféricos",
    "description": "Switch tátil, layout ABNT2."
}
```

Repita para:

```json
{
    "name": "Mouse Gamer",
    "price": 159.9,
    "tag": "periféricos",
    "description": "Sensor 12k DPI."
}
```

```json
{
    "name": "Headset",
    "price": 219.9,
    "tag": "áudio",
    "description": "Surround virtual."
}
```

```json
{
    "name": "Cadeira Ergonômica",
    "price": 899.9,
    "tag": "setup",
    "description": "Apoio lombar ajustável."
}
```

```json
{
    "name": "Monitor 24”",
    "price": 749.9,
    "tag": "setup",
    "description": "IPS, 75Hz."
}
```

```json
{
    "name": "Mousepad XL",
    "price": 79.9,
    "tag": "periféricos",
    "description": "Superfície speed."
}
```

Teste:

GET /products deve retornar a lista



## ETAPA 1

### Props + Children + MockAPI

**Objetivo desta etapa**

- Renderizar cards de produtos com map() (props)
- Abrir detalhes do produto ao clicar (sem estado) usando \<details>/\<summary>
- Botão Comprar chama callback via props (onBuy(product))
- Carrinho não funciona ainda (placeholder)



## 2) Estrutura de pastas

```
src/
  components/
    ui/
      Card.jsx
      Section.jsx
      Button.jsx
    shop/
      ProductGrid.jsx
      ProductCard.jsx
  App.jsx
  main.jsx
  style.css
```

## 3) Implementar os componentes UI (children)

### 3.1 src/components/ui/Card.jsx

```jsx
export default function Card({ children }) {
  return <div className="card">{children}</div>;
}
```

### 3.2 src/components/ui/Section.jsx

```jsx
export default function Section({ title, subtitle, children }) {
  return (
    <section className="section">
      <header className="section-header">
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </header>
      <div>{children}</div>
    </section>
  );
}
```

## 4) Implementar a Vitrine (props) e Detalhes sem estado (details/summary)

### 4.1 src/components/shop/ProductCard.jsx

```jsx
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function ProductCard({ product, onBuy }) {
  return (
    <details className="product">
      <summary className="product-summary">
        <Card>
          <small className="muted">#{product.tag}</small>
          <h3 className="product-name">{product.name}</h3>
          <strong>R$ {Number(product.price).toFixed(2)}</strong>
          <p className="muted product-hint">Clique para ver detalhes</p>
        </Card>
      </summary>

      <Card>
        <p className="product-desc">{product.description || "Sem descrição."}</p>

        <div className="product-actions">
          <Button onClick={() => onBuy(product)}>Comprar</Button>
        </div>
      </Card>
    </details>
  );
}
```

### 4.2 src/components/shop/ProductGrid.jsx

```jsx
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onBuy }) {
  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onBuy={onBuy} />
      ))}
    </div>
  );
}
```

## 5) App recebe produtos via props (sem hooks)

src/App.jsx

```jsx
import Section from "./components/ui/Section";
import ProductGrid from "./components/shop/ProductGrid";

export default function App({ products }) {
  function handleBuy(product) {
    alert(`(Etapa 1) Comprar: ${product.name}\nCarrinho entra na próxima aula 🙂`);
  }

  return (
    <div className="page">
      <header className="top">
        <h1>MiniShop</h1>
        <p className="muted">Etapa 1: props + children + MockAPI (sem hooks)</p>
      </header>

      <Section
        title="Produtos"
        subtitle="Cards gerados via map() e detalhes com <details> (sem estado)"
      >
        <ProductGrid products={products} onBuy={handleBuy} />
      </Section>

      <Section
        title="Carrinho"
        subtitle="Hoje é só UI/placeholder — na próxima aula liga com useState"
      >
        <p className="muted">Carrinho vazio (por enquanto).</p>
      </Section>
    </div>
  );
}
```

## 6) Fetch antes do React (sem useEffect)

src/main.jsx

⚠️ Troque API_URL pela URL do seu projeto MockAPI.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style.css";

const API_URL = "https://SEU-PROJETO.mockapi.io/api/products";

const root = ReactDOM.createRoot(document.getElementById("root"));

async function bootstrap() {
  root.render(<p style={{ padding: 16 }}>Carregando produtos...</p>);

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    // Suporta array direto ou { data: [...] }
    const products = Array.isArray(data) ? data : (data?.data ?? []);
    root.render(<App products={products} />);
  } catch (err) {
    root.render(
      <div style={{ padding: 16 }}>
        <h2>Erro ao carregar produtos</h2>
        <pre>{String(err)}</pre>
      </div>
    );
  }
}

bootstrap();
```

## 7) CSS mínimo

src/style.css

```css
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: system-ui, Arial;
    background: #0b1220;
    color: #eef2ff;
}

.page {
    max-width: 980px;
    margin: 0 auto;
    padding: 16px;
}

.top {
    margin-bottom: 16px;
}

.muted {
    color: rgba(238,242,255,.65);
}

.section {
  background: #0f1b2f;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 14px;
}

.section-title {
    margin: 0;
}

.section-subtitle {
    margin: 6px 0 0;
}

.card {
  background: #12233d;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 12px;
  padding: 12px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0,1fr));
    gap: 12px;
}

.btn {
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,.12);
  background: #0073ff;
  color: white;
}

.product {
    border-radius: 12px;
}

.product-summary {
    list-style: none;
    cursor: pointer;
}

.product-summary::-webkit-details-marker {
    display: none;
}

.product-name {
    margin: 6px 0 10px;
}

.product-hint {
    margin: 8px 0 0;
    font-size: 12px;
}

.product-desc {
    margin: 0 0 10px;
}

@media (max-width: 900px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 600px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
```

## 8) Rodar a Etapa 1

```
npm run dev
```
