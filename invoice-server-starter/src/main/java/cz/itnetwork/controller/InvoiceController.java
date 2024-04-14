package cz.itnetwork.controller;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceFilter;
import cz.itnetwork.entity.InvoicesStatistics;
import cz.itnetwork.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class InvoiceController {
    @Autowired
    private InvoiceService invoicesService;

    @PostMapping("/invoices")
    public InvoiceDTO addInvoices(@RequestBody InvoiceDTO data) {

        return  invoicesService.addInvoice(data);
    }

    @PutMapping("/invoices/{id}")
    public InvoiceDTO editInvoice(@PathVariable long id, @RequestBody InvoiceDTO data){
        return invoicesService.editInvoice(id,data);
    }

    @GetMapping("/invoices")
    public List<InvoiceDTO> getAllInvoices(InvoiceFilter filter) {

        return invoicesService.getAll(filter);
    }

    @DeleteMapping("/invoices/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteInvoices(@PathVariable Long id) {
        invoicesService.removeInvoice(id);
    }

    @GetMapping("/invoices/{id}")
    public InvoiceDTO getInvoice(@PathVariable Long id){

        return invoicesService.getInvoice(id);
    }

    @GetMapping("/identification/{id}/sales")
    public List<InvoiceDTO> getInvoicesSales(@PathVariable String id){

        return invoicesService.getInvoicesSales(id);
    }

    @GetMapping("/identification/{id}/purchases")
    public List<InvoiceDTO> getInvoicesPurchases(@PathVariable String id){
        return invoicesService.getInvoicesPurchases(id);
    }

    @GetMapping("/invoices/statistics")
    public List<InvoicesStatistics> getinvoicesStatistics(){
        return invoicesService.getinvoicesStatistics();
    }
}
