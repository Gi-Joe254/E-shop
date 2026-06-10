import "./prodTable.css"

export default function ProdTable({products, openSellForm, openAddForm, formIsOpen}) {
    return(
        <div className="prodCont">
            <table className="prodTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Date created</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item.id}>
                            <td id="name">{item.name}</td>
                            <td>{item.type}</td>  
                            <td>{item.brand}</td>
                            <td>{item.price}</td>
                            <td>{item.stock}</td>
                            <td>{new Date(item.created_at).toLocaleString()}</td>
                            <td>
                                <button 
                                    className="addBtn" 
                                    onClick={()=>{openAddForm(item)}}
                                >
                                    Add
                                </button>

                                <button
                                    onClick={()=>{openSellForm(item)}} 
                                    className="sellBtn"
                                >
                                    {formIsOpen ? 'Close' : 'Sell'}
                                </button>
                            </td>
                        </tr>     
                    ))}
                </tbody>
            </table>
                
        </div>

    )
}