package com.omery.projectAtm.services;

import com.omery.projectAtm.domain.entities.AccountEntity;
import com.omery.projectAtm.domain.entities.UserEntity;

import java.util.List;
import java.util.Optional;

public interface AccountService {
    AccountEntity save(AccountEntity accountEntity);
    boolean isExists(Long id);
    void deleteAccount(Long id);
    List<AccountEntity> findByUserId(Long id);
    AccountEntity findOneAcc(Long id,Long acc_id);
    AccountEntity partialUpdate(Long id, AccountEntity accountEntity);
    void delete(Long id);



}
