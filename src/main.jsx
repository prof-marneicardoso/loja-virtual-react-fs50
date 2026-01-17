import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import './style.css';

// Link da API
const API_LINK = "https://696b7b27624d7ddccaa15948.mockapi.io/api/products";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Chamada da API
async function bootstrap() {
  root.render(
    <p style={{padding: 16}}>Carregando produtos...</p>
  );

  // Tenta carregar os produtos
  try {
    // Espera o retorno da API (await)
    const response = await fetch(API_LINK);

    // Espera a conversão para JSON (await)
    const dados = await response.json();

    // Suporta array direto ou { dados: [...]}
    const productsList = Array.isArray(dados) ? dados : (dados?.dados ?? []);
    
    // Renderiza os produtos na tela
    root.render(
      <App productsList={productsList} />
    );

  } catch (error) {
    root.render(
      <div style={{padding: 16}}>
        <h3>Erro ao carregar produtos</h3>

        <pre>{String(error)}</pre>
      </div>
    );
  }
}

// Chama a funcao bootstrap ao carregar a página
bootstrap();
