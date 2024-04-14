package cz.itnetwork.service;
import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceFilter;
import cz.itnetwork.dto.mapper.InvoiceMapper;
import cz.itnetwork.dto.mapper.PersonMapper;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.InvoicesStatistics;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.entity.repository.InvoiceRepository;
import cz.itnetwork.entity.repository.PersonRepository;
import cz.itnetwork.entity.repository.Specification.InvoiceSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl implements InvoiceService{
    @Autowired
    private InvoiceMapper invoiceMapper;
    @Autowired
    private PersonMapper personMapper;

    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private PersonRepository personRepository;



    @Override
    public InvoiceDTO addInvoice(InvoiceDTO data) {
        PersonEntity personEntitySeller = personRepository.findById(data.getSeller().getId()).orElseThrow();
        data.setSeller(personMapper.toDTO(personEntitySeller));

        PersonEntity personEntityBuyer = personRepository.findById(data.getBuyer().getId()).orElseThrow();
        data.setBuyer(personMapper.toDTO(personEntityBuyer));

        InvoiceEntity entity = invoiceMapper.toEntity(data);

        entity = invoiceRepository.saveAndFlush(entity);
        return invoiceMapper.toDTO(entity);
    }

    @Override
    public List<InvoiceDTO> getInvoicesSales(String id){
        List<PersonEntity> entity = personRepository.findByIdentificationNumber(id);

        return entity.stream()
                .map(PersonEntity::getSales)
                .flatMap(List::stream)
                .map(item -> invoiceMapper.toDTO(item))
                .collect(Collectors.toList());
    }
    @Override
    public List<InvoiceDTO> getInvoicesPurchases(String id){
        List<PersonEntity> entity = personRepository.findByIdentificationNumber(id);
        return entity.stream()
                .map(PersonEntity::getPurchases)
                .flatMap(List::stream)
                .map(item -> invoiceMapper.toDTO(item))
                .collect(Collectors.toList());
    }

    @Override
    public void removeInvoice(long id) {
        try {
            InvoiceEntity invoice = fetchInvoiceById(id);

            invoiceRepository.delete(invoice);
        } catch (NotFoundException ignored) {
            throw new NotFoundException("Invoice with identifier " + id + " was not found.");
        }
    }

    @Override
    public List<InvoiceDTO> getAll(InvoiceFilter filter) {
        InvoiceSpecification invoiceSpecification = new InvoiceSpecification(filter);
        return invoiceRepository.findAll(invoiceSpecification, PageRequest.of(0, filter.getLimit()))
                .stream()
                .map(invoiceMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public InvoiceDTO getInvoice(long id) {
        InvoiceEntity invoiceEntity = fetchInvoiceById(id);
        return invoiceMapper.toDTO(invoiceEntity);
    }

    @Override
    public InvoiceDTO editInvoice(long id, InvoiceDTO data) {
        data.setId(id);
        InvoiceEntity fetchInvoice = fetchInvoiceById(id);

        invoiceMapper.updateInvoiceEntity(data, fetchInvoice);
        fetchInvoice.setBuyer(personRepository.getReferenceById(data.getBuyer().getId()));
        fetchInvoice.setSeller(personRepository.getReferenceById(data.getSeller().getId()));

        fetchInvoice = invoiceRepository.save(fetchInvoice);

        return invoiceMapper.toDTO(fetchInvoice);
    }

    @Override
    public List<InvoicesStatistics> getinvoicesStatistics(){
        List<InvoicesStatistics> invoicesStatistics = invoiceRepository.getInvoicesStatistics();

        return invoicesStatistics;
    }

    private InvoiceEntity fetchInvoiceById(long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Invoice with id " + id + " wasn't found in the database."));
    }
}