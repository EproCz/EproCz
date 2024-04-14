import React, {useEffect, useState} from "react";

import {apiDelete, apiGet} from "../utils/api";
import InvoicesTable from "./InvoicesTable";
import InvoicesFilter from "./InvoicesFilter";
import InvoicesStatistics from "./InvoicesStatistics";

    const InvoicesIndex = () => {
        const [invoices, setInvoices] = useState([]);
        const [invoicesStatistics, setStatistics] = useState([]);
        const [personsList, setPersonsList] = useState([]);
        const [filterState, setFilter] = useState({
            buyerId: undefined,
            sellerId: undefined,
            product: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            limit: undefined,
        });

        
        const deleteInvoice = async (id) => {
            try {
                await apiDelete("/api/invoices/" + id);
            } catch (error) {
                console.log(error.message);
                alert(error.message)
            }
            setInvoices(invoices.filter((item) => item._id !== id));
        };
    
        useEffect(() => {
            apiGet("/api/invoices").then((data) => setInvoices(data));
            apiGet("/api/invoices/statistics").then((data) => setStatistics(data))
            apiGet("/api/persons").then((data) => setPersonsList(data));
        }, []);


        const handleChange = (e) => {
            
            if(e.target.value === "false" || e.target.value === "true" || e.target.value === ""){
                setFilter(prevState => {
                    return {...prevState, [e.target.name]: undefined}
                })
            } else{
                setFilter(prevState => {
                    return {...prevState, [e.target.name]: e.target.value}
                })
            }
            
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            const params = filterState;

            const data = await apiGet("/api/invoices", params);
            setInvoices(data);
        }

    
        return (
            <>
                <h1>Seznam faktur</h1>
                <hr/>
                <InvoicesFilter
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    buyerList={personsList}
                    sellerList={personsList}
                    filter={filterState}
                    confirm="Filtrovat faktury"
                />
                <hr/>
                <InvoicesStatistics
                    label="Statistiky faktur:"
                    items={invoicesStatistics}
                />
                <hr/>
                <InvoicesTable
                    deleteInvoice={deleteInvoice}
                    items={invoices}
                    label="Počet faktur:"
                />
            </>
        );
    };

export default InvoicesIndex;