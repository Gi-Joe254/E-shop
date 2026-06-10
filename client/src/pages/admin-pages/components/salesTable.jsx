import "./salesTable.css"

export default function SalesTable ({sales}) {
    return(
        <div className="salesCont">
            <table className="salesTable">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                        <th>Type</th>
                        <th>Brand</th>
                    </tr> 
                </thead>
                <tbody>
                    {sales.map((sale)=> (
                        <tr key={sale.id}>
                            <td>{new Date(sale.created_at).toLocaleString()}</td>
                            <td>{sale.product}</td>
                            <td>{sale.quantity}</td>
                            <td>{sale.sale_price}</td>
                            <td className="totalCell">{sale.total}</td>
                            <td>{sale.type}</td>
                            <td>{sale.brand}</td>
                        </tr>
                        
                    ))}
                </tbody>
                    
            </table>
        </div>
    )
}