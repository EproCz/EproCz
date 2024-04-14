package cz.itnetwork.entity.repository;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.InvoicesStatistics;
import cz.itnetwork.entity.PersonStatistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import java.util.List;


public interface InvoiceRepository extends JpaRepository<InvoiceEntity, Long >, JpaSpecificationExecutor<InvoiceEntity> {
    /**
     * Metoda pro získání statistik faktur.
     * Vrací seznam objektů typu InvoicesStatistics, které obsahují statistiky faktur.
     * Statistiky obsahují součet cen faktur pro aktuální rok, celkový součet cen faktur a počet faktur.
     * @return Seznam objektů InvoicesStatistics obsahující statistiky faktur.
     */
    @Query("SELECT NEW cz.itnetwork.entity.InvoicesStatistics(SUM(CASE WHEN YEAR (i.issued) = YEAR(CURRENT DATE) THEN i.price ELSE 0 END), SUM(i.price), COUNT(i.id)) FROM invoice i")
    List<InvoicesStatistics> getInvoicesStatistics();

    /**
     * Metoda pro získání statistik prodejců.
     * Vrací seznam objektů typu PersonStatistics, které obsahují statistiky prodejců.
     * Statistiky obsahují identifikátor prodejce, jméno prodejce a součet cen jeho faktur.
     * @return Seznam objektů PersonStatistics obsahující statistiky prodejců.
     */
    @Query("SELECT new cz.itnetwork.entity.PersonStatistics(p.id, p.name, COALESCE(SUM(i.price), 0.0)) FROM person p LEFT JOIN invoice i on p.id = i.seller.id group by p.id")
    List<PersonStatistics> getSellerStatistics();
}
