package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceFilter;
import cz.itnetwork.entity.InvoicesStatistics;
import java.util.List;

public interface InvoiceService {

    /**
     * Metoda pro přidání nové faktury.
     * @param data Informace o faktuře, která má být přidána.
     * @return DTO objekt reprezentující přidanou fakturu.
     */
    InvoiceDTO addInvoice(InvoiceDTO data);

    /**
     * Metoda pro získání seznamu prodejních faktur pro zadaného prodejce.
     * @param id Identifikátor prodejce.
     * @return Seznam prodejních faktur pro zadaného prodejce.
     */
    List<InvoiceDTO> getInvoicesSales(String id);

    /**
     * Metoda pro získání seznamu nákupních faktur pro zadaného kupujícího.
     * @param id Identifikátor kupujícího.
     * @return Seznam nákupních faktur pro zadaného kupujícího.
     */
    List<InvoiceDTO> getInvoicesPurchases(String id);

    /**
     * Metoda pro odstranění faktury.
     * @param id Identifikátor faktury, která má být odstraněna.
     */
    void removeInvoice(long id);

    /**
     * Metoda pro získání seznamu faktur podle zadaných filtrů.
     * @param filter Filtr pro vyhledávání faktur.
     * @return Seznam faktur odpovídajících zadaným filtrům.
     */
    List<InvoiceDTO> getAll(InvoiceFilter filter);

    /**
     * Metoda pro získání informací o jedné faktuře.
     * @param id Identifikátor faktury, pro kterou mají být získány informace.
     * @return DTO objekt obsahující informace o zadané faktuře.
     */
    InvoiceDTO getInvoice(long id);

    /**
     * Metoda pro úpravu faktury.
     * @param id Identifikátor faktury, která má být upravena.
     * @param data Informace o faktuře, která má být použita pro úpravu.
     * @return DTO objekt reprezentující upravenou fakturu.
     */
    InvoiceDTO editInvoice(long id, InvoiceDTO data);

    /**
     * Metoda pro získání statistik faktur.
     * @return Seznam objektů obsahující statistiky faktur.
     */
    List<InvoicesStatistics> getinvoicesStatistics();
}
