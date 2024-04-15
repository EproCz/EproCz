package cz.itnetwork.entity;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PersonStatistics {
    private Long personId;
    private String personName;
    private double revenue;
}
