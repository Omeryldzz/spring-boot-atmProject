package com.omery.projectAtm.services.impl;

import com.omery.projectAtm.domain.entities.AccountEntity;
import com.omery.projectAtm.domain.entities.UserEntity;
import com.omery.projectAtm.repositories.AccountRepository;
import com.omery.projectAtm.repositories.UserRepository;
import com.omery.projectAtm.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class AccountServiceImpl implements AccountService {
    private AccountRepository accountRepository;
    private UserRepository userRepository;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository,UserRepository userRepository){
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;}

    @Override
    public AccountEntity save(AccountEntity accountEntity) {
        return accountRepository.save(accountEntity);
    }

    @Override
    public boolean isExists(Long id) {
        return accountRepository.existsById(id);
    }

    @Override
    public void deleteAccount(Long id){accountRepository.deleteById(id);}

    @Override
    public  List<AccountEntity> findByUserId(Long id){
        List<AccountEntity> accounts = accountRepository.getAccounts(id);
        return StreamSupport.stream(accounts
                                .spliterator(),
                        false)
                .collect(Collectors.toList());
    }
    @Override
    public AccountEntity findOneAcc(Long id,Long acc_id) {

        List<AccountEntity> accounts = accountRepository.getAccounts(id);
        AccountEntity acc = accounts.stream()
                .filter(account -> acc_id.equals(account.getAcc_id()))
                .findAny()
                .orElse(null);
        return acc;
    }
    @Override
    public AccountEntity partialUpdate(Long id, AccountEntity accountEntity) {

        accountEntity.setAcc_id(id);
        return accountRepository.findById(id).map(existingAcc -> {
            Optional.ofNullable(accountEntity.getTotalCredit()).ifPresent(existingAcc::setTotalCredit);
            return accountRepository.save(existingAcc);
        }).orElseThrow(() -> new RuntimeException("User does not exist"));
    }
    @Override
    public void delete(Long id){
       accountRepository.deleteById(id);
    }



}
