import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

import {apiGet} from "../utils/api";

const InvoicePurchases = ({label, items}) => {
    const [purchases, setPurchases] = useState([])

    useEffect(() => {
        apiGet("/api/identification/" + items + "/purchases").then((data) => setPurchases(data));
    }, [items]);

    return(
        <>
            <h1>{label}</h1>
            <hr/>
            <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Číslo faktury</th>
                            <th>Dodavatel</th>
                            <th>Datum vystavení</th>
                            <th>Datum splatnosti</th>
                            <th>Částka</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((item, index) =>(
                           <tr key={index + 1}>
                            <th>
                            {item.invoiceNumber && (
                                <Link to={`/invoices/show/${item._id}`} className="link-success" title={`Číslo faktury: ${item.invoiceNumber}`}>
                                    {item.invoiceNumber}
                                </Link>
                            )}
                            </th>
                            <th>
                            {item.seller && (
                                <Link to={`/persons/show/${item.seller._id}`} className="link-success" title={`IČ: ${item.seller.identificationNumber}`}>
                                    {item.seller.name}
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
    );
}

export default InvoicePurchases;