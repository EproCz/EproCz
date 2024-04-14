package cz.itnetwork.entity;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class InvoicesStatistics {
    private double currentYearSum;
    private double allTimeSum;
    private long invoicesCount;
}
