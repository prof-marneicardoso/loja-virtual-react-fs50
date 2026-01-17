import Card from "../ui/Card";
import Button from "../ui/Button";

export default function ProductCard({product, onBuy}) {
    return(
        <details className="product">
            <summary className="product-summary">
                <Card>
                    <small className="muted">#{product.tag}</small>

                    <h3 className="product-name">{product.name}</h3>

                    <strong>R$ {Number(product.price).toFixed(2)}</strong>

                    <p className="muted product-hint">
                        Clique para ver detalhes
                    </p>
                </Card>
            </summary>

            <Card>
                {/* Carrega a descrição OU o texto padrão */}
                <p>{product.description || "Sem descrição"}</p>

                <div className="product-actions">
                    <Button onClick={() => onBuy(product)}>
                        Comprar
                    </Button>
                </div>
            </Card>
        </details>
    );
}
