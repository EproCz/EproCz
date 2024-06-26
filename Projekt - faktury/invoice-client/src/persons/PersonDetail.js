import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { apiGet } from "../utils/api";
import Country from "./Country";
import InvoicePurchases from "../invoices/InvoicePurchases";
import InvoiceSales from "../invoices/InvoiceSales";

const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState([null]);

  useEffect(() => {
    apiGet("/api/persons/" + id).then((data) => setPerson(data));
  }, [id]);

  const country =
    Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

  return (
    <div className="d-flex justify-content-between">
      <div>
        <h1>Detail osoby</h1>
        <hr />
        <h3>
          {person.name} ({person.identificationNumber})
        </h3>
        <p>
          <strong>DIČ:</strong>
          <br />
          {person.taxNumber}
        </p>
        <p>
          <strong>Bankovní účet:</strong>
          <br />
          {person.accountNumber}/{person.bankCode} ({person.iban})
        </p>
        <p>
          <strong>Tel.:</strong>
          <br />
          {person.telephone}
        </p>
        <p>
          <strong>Mail:</strong>
          <br />
          {person.mail}
        </p>
        <p>
          <strong>Sídlo:</strong>
          <br />
          {person.street}, {person.city},{person.zip}, {country}
        </p>
        <p>
          <strong>Poznámka:</strong>
          <br />
          {person.note}
        </p>
      </div>

      <div>
        <InvoiceSales
          label="Vystavené faktury"
          items={person.identificationNumber}
        />
        <InvoicePurchases
          label="Přijaté faktury"
          items={person.identificationNumber}
        />
      </div>
    </div>
  );
};

export default PersonDetail;
