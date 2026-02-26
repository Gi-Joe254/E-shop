import "./jobCard.css"

export default function JobCard({jobs, handleDelete, handleComplete, busyId}) {
    return(
        <div className="jobList">
           {jobs.map((item) => (
                <div className="jobCard" key={item.id}>
                    <div className="jobHeader">
                        <span className={`jobStatus ${item.status}`}>
                            {item.status}
                        </span>
                        <span className="jobDate">{new Date(item.created_at).toString().split('GMT')[0]}</span>
                    </div>

                    <p className="jobType"> {item.type}</p>
                    <p className="jobDesc"> {item.description}</p>

                    <div className="jobMeta">
                        <p><strong>Name:</strong> {item.name}</p>
                        <p><strong>Email:</strong> {item.email}</p>
                        <p><strong>Phone:</strong> {item.telephone}</p>
                        <p><strong>Location:</strong> {item.location}</p>
                    </div>
                    
                    <div className="jobActions">
                        {item.status === 'completed' &&
                            <button 
                                className="delBtn"
                                onClick={()=>{handleDelete(item.id)}}
                                disabled = {busyId === item.id}
                            >Delete
                            </button>
                        }
                    
                        {item.status === 'pending' &&
                            <button 
                                className="compBtn"
                                onClick={()=>{handleComplete(item.id)}}
                                disabled = {busyId === item.id}
                            >Complete
                            </button>   
                        }
                    </div>

                </div>

            ))}      
        </div>

    )
}