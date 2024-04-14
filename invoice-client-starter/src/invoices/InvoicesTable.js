

import React from "react";
import {Link} from "react-router-dom";

const InvoicesTable = ({label, items, deleteInvoice}) => {
    return (
        <div>
            <p>
                {label} {items.length}
            </p>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Číslo faktury</th>
                    <th>Dodavatel</th>
                    <th>Odběratel</th>
                    <th>Product</th>
                    <th>Datum vystavení</th>
                    <th>Datum splatnosti</th>
                    <th>Částka</th>
                    <th>Akce</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{item.invoiceNumber}</td>
                        <td>
                            <Link to={"/persons/show/" + item.seller._id} className="link-success" title={'IČ: ${item.seller.identificationNumber}'}>
                                {item.seller.name}
                            </Link>
                        </td>
                        <td>
                        <Link to={"/persons/show/" + item.buyer._id} className="link-success" title={'IČ: ${item.buyer.identificationNumber}'}>
                                {item.buyer.name}
                            </Link>
                        </td>
                        <td>{item.product}</td>
                        <td>{item.issued}</td>
                        <td>{item.dueDate}</td>
                        <td>{item.price} Kč</td>
                        <td>
                        <div className="btn-group">
                                <Link
                                    to={"/invoices/show/" + item._id}
                                    className="btn btn-sm btn-info"
                                >
                                    Zobrazit
                                </Link>
                                <Link
                                    to={"/invoices/edit/" + item._id}
                                    className="btn btn-sm btn-warning"
                                >
                                    Upravit
                                </Link>
                                <button
                                    onClick={() => deleteInvoice(item._id)}
                                    className="btn btn-sm btn-danger"
                                >
                                    Odstranit
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to={"/invoices/create"} className="btn btn-success">
                Nová faktura
            </Link>
        </div>
    );
};

export default InvoicesTable;
