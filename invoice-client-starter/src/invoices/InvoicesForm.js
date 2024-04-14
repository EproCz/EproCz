import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {apiGet, apiPost, apiPut} from "../utils/api";
import InputSelect from "../components/InputSelect"
import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const InvoicesForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [persons, setPersons] = useState([]);
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        seller: {
            _id: "0"
        },
        buyer: {
            _id: "0"
        },
        issued: new Date().toISOString().slice(0, 10),
        dueDate: new Date().toISOString().slice(0, 10),
        product: "",
        price: 0,
        vat: 21,
        note: ""
    });



    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
    }, [id]);

    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersons(data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();


        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    const sent = sentState;
    const success = successState;

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr/>
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>
                
                <InputField
                    required={true}
                    type="text"
                    name="invoiceNumber"
                    label="Číslo faktury"
                    min="3"
                    prompt="Zadejte číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => {
                        setInvoice({...invoice, invoiceNumber: e.target.value});
                    }}
                />

                

                <InputSelect
                    name="seller"
                    items={persons}
                    handleChange={(e) => {
                        setInvoice({...invoice, seller: {...invoice.seller, _id: e.target.value}});
                    }}
                    label="Dodavatel"
                    prompt="nevybrán"
                    value={invoice.seller._id}
                />

                <InputSelect
                    name="buyer"
                    items={persons}
                    handleChange={(e) => {
                        setInvoice({...invoice, buyer: {...invoice.buyer, _id: e.target.value}});
                    }}
                    label="Odběratel"
                    prompt="nevybrán"
                    value={invoice.buyer._id}
                />

                <div className="form-group">
                    <label>Datum vystavení</label>
                    <br />
                    <DatePicker
                        selected={invoice.dueDate}
                        onChange={(date) => setInvoice({ ...invoice, dueDate: date.toISOString().slice(0,10) })}
                        dateFormat="yyyy-MM-dd"
                    />
                </div>

                <div className="form-group">
                    <label>Datum splatnosti</label>
                    <br />
                    <DatePicker
                        selected={invoice.issued}
                        onChange={(date) => setInvoice({ ...invoice, issued: date.toISOString().slice(0,10) })}
                        dateFormat="yyyy-MM-dd"
                    />
                </div>

                <InputField
                    required={true}
                    type="text"
                    name="product"
                    min="3"
                    label="Produkt"
                    prompt="Zadejte produkt"
                    value={invoice.product}
                    handleChange={(e) => {
                        setInvoice({...invoice, product: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="number"
                    name="price"
                    min="3"
                    label="cena"
                    prompt="Zadejte cenu"
                    value={invoice.price}
                    handleChange={(e) => {
                        setInvoice({...invoice, price: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="number"
                    name="vat"
                    min="3"
                    label="Daň"
                    value={invoice.vat}
                    handleChange={(e) => {
                        setInvoice({...invoice, vat: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="note"
                    min="3"
                    label="Popis"
                    prompt="Zadejte popis produktu"
                    value={invoice.note}
                    handleChange={(e) => {
                        setInvoice({...invoice, note: e.target.value});
                    }}
                />

                <input type="submit" className="btn btn-primary" value="Uložit"/>
            </form>
        </div>
    );
};

export default InvoicesForm;
