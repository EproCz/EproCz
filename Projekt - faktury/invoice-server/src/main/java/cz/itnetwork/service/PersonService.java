package cz.itnetwork.service;

import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.entity.PersonStatistics;
import java.util.List;

public interface PersonService {

    /**
     * Metoda pro přidání nové osoby.
     * @param personDTO Informace o osobě, která má být přidána.
     * @return DTO objekt reprezentující přidanou osobu.
     */
    PersonDTO addPerson(PersonDTO personDTO);

    /**
     * Metoda pro odstranění osoby.
     * @param id Identifikátor osoby, která má být odstraněna.
     */
    void removePerson(long id);

    /**
     * Metoda pro získání seznamu všech osob.
     * @return Seznam všech osob.
     */
    List<PersonDTO> getAll();

    /**
     * Metoda pro získání statistik osob.
     * @return Seznam objektů obsahující statistiky osob.
     */
    List<PersonStatistics> getPersonsStatistics();

    /**
     * Metoda pro získání informací o jedné osobě.
     * @param id Identifikátor osoby, pro kterou mají být získány informace.
     * @return DTO objekt obsahující informace o zadané osobě.
     */
    PersonDTO getPerson(long id);

    /**
     * Metoda pro úpravu osoby.
     * @param id Identifikátor osoby, která má být upravena.
     * @param personDTO Informace o osobě, která má být použita pro úpravu.
     * @return DTO objekt reprezentující upravenou osobu.
     */
    PersonDTO editPerson(Long id, PersonDTO personDTO);
}
