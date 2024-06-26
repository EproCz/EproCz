package cz.itnetwork.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Entity(name = "invoice")
@Getter
@Setter
public class InvoiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String invoiceNumber;


    @ManyToOne
    private PersonEntity seller;

    @ManyToOne
    private PersonEntity buyer;

    @Column(nullable = false)
    private LocalDate issued;
    @Column(nullable = false)
    private LocalDate dueDate;
    @Column(nullable = false)
    private String product;
    @Column(nullable = false)
    private double price;
    @Column(nullable = false)
    private int VAT;
    private String note;
}
