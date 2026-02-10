export default function JobCard({jobs, handleDelete, handleComplete, busyId}) {
    return(
       jobs.map((item)=> (
            <div key={item.id}>
                <p> {item.type}</p>
                <p> {item.description}</p>
                <p> {item.name}</p>
                <p> {item.email}</p>
                <p> {item.telephone}</p>
                <p >{item.location}</p>
                <p >{item.status}</p>
                <p >{item.created_at}</p>
                {item.status === 'completed' &&
                    <button 
                        onClick={()=>{handleDelete(item.id)}}
                        disabled = {busyId === item.id}
                    >Delete
                    </button>
                }
                {item.status === 'pending' &&
                    <button 
                        onClick={()=>{handleComplete(item.id)}}
                        disabled = {busyId === item.id}
                    >Complete
                    </button>   
                }
            </div>
            
        ))
    )
}