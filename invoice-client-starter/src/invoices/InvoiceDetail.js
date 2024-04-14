
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { apiGet } from "../utils/api";

const InvoiceDetail = () => {
    const {id} = useParams();
    const [invoice, setInvoice] = useState({});

    useEffect(() => {
        apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
    }, [id]);

    return (
        <div>
            <h1>Detail faktury</h1>
            <hr/>
            <h3>Číslo faktury: {invoice.invoiceNumber}</h3>
            <p>
                <strong>Dodavatel</strong>
                <br/>
                {invoice.seller && (
                    <Link to={`/persons/show/${invoice.seller._id}`} className="link-success" title={`IČ: ${invoice.seller.identificationNumber}`}>
                    {invoice.seller.name}
                    </Link>
                )}
            </p>
            <p>
                <strong>Odběratel</strong>
                <br/>
                {invoice.buyer && (
                    <Link to={`/persons/show/${invoice.buyer._id}`} className="link-success" title={`IČ: ${invoice.buyer.identificationNumber}`}>
                    {invoice.buyer.name}
                    </Link>
                )}
            </p>
            <p>
                <strong>Datum vystavení</strong>
                <br/>
                {invoice.issued}
                <br/>
                <strong>Datum splatnosti</strong>
                <br/>
                {invoice.dueDate}
            </p>
            <p>
                <strong>Product</strong>
                <br/>
                {invoice.product}
                <br/>
                <strong>Cena s DPH</strong>
                <br/>
                {invoice.price} Kč
                <br/>
                <strong>Cena bez DPH</strong>
                <br/>
                {(invoice.price - (invoice.price - (invoice.price / 1.21))).toFixed(2)} Kč
                <br/>
                <strong>DPH</strong>
                <br/>
                {invoice.vat}%
                <br/>
                <strong>Poznámka</strong>
                <br/>
                {invoice.note}
            </p>
        </div>
    )
};

export default InvoiceDetail;
