export default function Section({title, subtitle, children}) {
    return(
        <section className="section">
            <header className="section-header">
                <h2 className="section-title">{title}</h2>
                {subtitle && <p className="section-subtitle">{subtitle}</p>}
            </header>
            <div>{children}</div>
        </section>
    );
}
