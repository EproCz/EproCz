

const InvoicesStatistics = ({label, items}) => {

    return (
        <div>
            <h3>{label}</h3>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="col-1">Počet faktur:</th>
                        <th className="col-1">Součet cen za letošní rok:</th>
                        <th className="col-1">Součet cen za všechny roky:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{items.invoicesCount}</td>
                        <td>{items.currentYearSum} Kč</td>
                        <td>{items.allTimeSum} Kč</td>
                    </tr>
                </tbody>
            </table>
        </div>

        
    )
}

export default InvoicesStatistics;