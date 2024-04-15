/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */
package cz.itnetwork.entity.repository;

import cz.itnetwork.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonRepository extends JpaRepository<PersonEntity, Long> {

    /**
     * Metoda pro vyhledání osob podle skrytého stavu.
     * Vrací seznam objektů typu PersonEntity, které mají zadaný skrytý stav.
     * @param hidden Skrytý stav, podle kterého se mají vyhledávat osoby.
     * @return Seznam objektů PersonEntity, které mají zadaný skrytý stav.
     */
    List<PersonEntity> findByHidden(boolean hidden);

    /**
     * Metoda pro vyhledání osob podle identifikačního čísla.
     * Vrací seznam objektů typu PersonEntity, které mají zadané identifikační číslo.
     * @param identificationNumber Identifikační číslo, podle kterého se mají vyhledávat osoby.
     * @return Seznam objektů PersonEntity, které mají zadané identifikační číslo.
     */
    List<PersonEntity> findByIdentificationNumber(String identificationNumber);


}
