import PacksList from "components/PacksList";

export default Packages;

function Packages() {


    return (
        <div className="pt-5 mb-3 mt-3 container app-container">
            <div className='d-flex justify-content-center app-container'>
                <div className="d-flex flex-column justify-content-center">
                    <h1 className="text-center">Choose your plan</h1>
                    <span className="text-center mb-3">Save with an annual plan and get access to all the features and new functions with every upgrade.</span>
                    <PacksList />
                </div>
            </div>
        </div>
    );
}