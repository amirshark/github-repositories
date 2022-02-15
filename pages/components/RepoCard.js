export default function RepoCard({data}) {

    return (
        <div className='card'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <h5 className='fw-bold'>{data.name || 'Repository Name'}</h5>
                        <p className='mb-md-0 mb-3'>{data.description || 'Repository Description'}</p>
                    </div>
                    <div className='col-12 col-md-6 text-end d-flex justify-content-between flex-md-column'>
                        <p className='fs-6 mb-md-2 mb-0'><span className='mdi mdi-star text-warning'></span>&nbsp;{data.stargazers_count || 0}&nbsp;&nbsp;<span className='mdi mdi-source-fork text-success'></span>&nbsp;{data.forks_count || 0}&nbsp;&nbsp;<span className='mdi mdi-eye text-info'></span>&nbsp;{data.watchers_count || '0'}</p>
                        <p className='mb-0'>{data.language || 'Text'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}