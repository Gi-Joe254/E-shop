import "./prodTable.css"

export default function ProdTable({products}) {
    return(
        <div className="prodCont">
            <table className="prodCard">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Date created</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>{item.brand}</td>
                            <td>{item.price}</td>
                            <td>{item.stock}</td>
                            <td>{item.created_at}</td>
                        </tr>     
                    ))}
                </tbody>
            </table>
                
        </div>

    )
}