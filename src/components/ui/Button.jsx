export default function Button({clique, children}) {
    return(
        <button className="btn" onClick={clique}>
            {children}
        </button>
    );
}
