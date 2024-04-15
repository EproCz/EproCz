

const PersonsStatistics = ({label, items}) => {

    return (
        <>
            <h4>{label}</h4>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Název</th>
                        <th>Příjmy</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                       <tr key={index}>
                        <td>{item.personId}</td>
                        <td>{item.personName}</td>
                        <td>{item.revenue} Kč</td>
                    </tr> 
                    ))}
                    
                </tbody>
            </table>
        </>
    )
}

export default PersonsStatistics