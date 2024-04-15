package cz.itnetwork.dto;

import lombok.Data;

@Data
public class InvoiceFilter {

    private Long buyerId;
    private Long sellerId;
    private String product;
    private Double minPrice;
    private Double maxPrice;
    private int limit = 10;

}
