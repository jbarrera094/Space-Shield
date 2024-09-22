export { Layout };

function Layout({ children }) {
    return (
        <div className="container app-container">
            <div className='d-flex justify-content-center app-container'>
                <div className="d-flex flex-column justify-content-center">
                    {children}
                </div>
            </div>
        </div>
    );
}