import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

import {apiGet} from "../utils/api";

const InvoiceSales = ({label, items}) => {
    const [sales, setSales] = useState([])

    useEffect(() => {
        apiGet("/api/identification/" + items + "/sales").then((data) => setSales(data));
    }, [items]);

    return(
        <>
            <h1>{label}</h1>
            <hr/>
            <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Číslo faktury</th>
                            <th>Odběratel</th>
                            <th>Datum vystavení</th>
                            <th>Datum splatnosti</th>
                            <th>Částka</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((item, index) =>(
                           <tr key={index + 1}>
                            <th>
                            {item.invoiceNumber && (
                                <Link to={`/invoices/show/${item._id}`} className="link-success" title={`Číslo faktury: ${item.invoiceNumber}`}>
                                    {item.invoiceNumber}
                                </Link>
                            )}
                            </th>
                            <th>
                            {item.buyer && (
                                <Link to={`/persons/show/${item.buyer._id}`} className="link-success" title={`IČ: ${item.buyer.identificationNumber}`}>
                                    {item.buyer.name}
                                </Link>
                            )}
                            </th>
                            <th>{item.issued}</th>
                            <th>{item.dueDate}</th>
                            <th>{item.price} Kč</th>
                        </tr>
                        ))}
                    </tbody>
                </table>
        </>
    )
}

export default InvoiceSales;