import React, {useEffect, useState} from "react";

import {apiDelete, apiGet} from "../utils/api";

import PersonTable from "./PersonTable";
import PersonsStatistics from "./PersonsStatistics";

const PersonIndex = () => {
    const [persons, setPersons] = useState([]);
    const [personsStatistics, setStatistics] = useState([]);

    const deletePerson = async (id) => {
        try {
            await apiDelete("/api/persons/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setPersons(persons.filter((item) => item._id !== id));
    };

    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersons(data));
        apiGet("/api/persons/statistics").then((data) => setStatistics(data));
    }, []);

    return (
        <div>
            <h1>Seznam osob</h1>
            <hr/>
            {!persons.length ? (
                <div>Loading...</div>
            ): (
                <div className="d-flex justify-content-between">
                <div className="col-6">
                    <PersonTable
                        deletePerson={deletePerson}
                        items={persons}
                        label="Počet osob:"
                    />
                </div>
                <div className="col-5">
                    <PersonsStatistics
                            label="Statistiky společností:"
                            items={personsStatistics}
                        />
                </div>
            </div>
            )}
        </div>   
    );
};
export default PersonIndex;
