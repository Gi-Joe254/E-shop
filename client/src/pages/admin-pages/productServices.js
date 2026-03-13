
export const addProduct = async()=> {
    const data = {name:'phone charger', type: 'type c', brand: 'Tecno', price: 350, stock: 2}
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/product`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            credentials: 'include'
        }
    )
}
