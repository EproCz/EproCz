package cz.itnetwork.entity.repository.Specification;

import cz.itnetwork.dto.InvoiceFilter;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.InvoiceEntity_;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.entity.PersonEntity_;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import java.util.ArrayList;
import java.util.List;

/**
 * Třída InvoiceSpecification slouží k vytváření filtrů pro faktury.
 */
@RequiredArgsConstructor
public class InvoiceSpecification implements Specification<InvoiceEntity> {
    private final InvoiceFilter filter;


    /**
     * Metoda pro vytvoření predikátu na základě zadaných kritérií.
     * @param root Kořenový objekt kritérií.
     * @param criteriaQuery Kritéria pro dotazování.
     * @param criteriaBuilder Builder kritérií.
     * @return Vytvořený predikát na základě zadaných kritérií.
     */
    @Override
    public Predicate toPredicate(Root<InvoiceEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder){
        List<Predicate> predicates = new ArrayList<>();

        if (filter.getSellerId() != null){
            Join<PersonEntity, InvoiceEntity> sellerJoin = root.join(InvoiceEntity_.SELLER);
            predicates.add(criteriaBuilder.equal(sellerJoin.get(PersonEntity_.ID), filter.getSellerId()));
        }

        if (filter.getBuyerId() != null){
            Join<PersonEntity, InvoiceEntity> buyerJoin = root.join(InvoiceEntity_.BUYER);
            predicates.add(criteriaBuilder.equal(buyerJoin.get(PersonEntity_.ID), filter.getBuyerId()));
        }

        if (filter.getProduct() != null){
            Expression<String> product = root.get(InvoiceEntity_.PRODUCT);
            predicates.add((criteriaBuilder.like(product, "%" + filter.getProduct() + "%")));
        }

        if (filter.getMaxPrice() != null){
            Expression<Double> price = root.get(InvoiceEntity_.PRICE);
            predicates.add(criteriaBuilder.lessThanOrEqualTo(price, filter.getMaxPrice()));
        }

        if (filter.getMinPrice() != null){
            Expression<Double> price = root.get(InvoiceEntity_.PRICE);
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(price, filter.getMinPrice()));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
