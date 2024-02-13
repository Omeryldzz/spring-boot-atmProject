package com.omery.projectAtm.domain.entities;

import com.omery.projectAtm.domain.entities.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "accounts")

public class AccountEntity {

    @Id
    private Long acc_id;

    @Column(nullable=false)
    private Long totalCredit;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private UserEntity userEntity;


}

