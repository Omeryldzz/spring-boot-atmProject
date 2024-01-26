package com.omery.projectAtm.repositories;

import com.omery.projectAtm.domain.entities.AccountEntity;
import com.omery.projectAtm.domain.entities.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends CrudRepository<AccountEntity,Long> {
    @Query("SELECT a from AccountEntity a where a.userEntity.id = ?1")
    List<AccountEntity> getAccounts(Long id);
}
