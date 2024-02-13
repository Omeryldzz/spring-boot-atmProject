package com.omery.projectAtm.controller;

import com.omery.projectAtm.domain.dto.AccountDto;
import com.omery.projectAtm.domain.dto.UserDto;
import com.omery.projectAtm.domain.entities.AccountEntity;
import com.omery.projectAtm.domain.entities.UserEntity;
import com.omery.projectAtm.mappers.Mapper;
import com.omery.projectAtm.services.AccountService;
import com.omery.projectAtm.services.UserService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class AccountController {
    private UserService userService;

    private Mapper<UserEntity, UserDto> userMapper;

    private AccountService accountService;

    private Mapper<AccountEntity, AccountDto> accountMapper;

    public AccountController(UserService userService,AccountService accountService, Mapper<AccountEntity,
            AccountDto> accountMapper,Mapper<UserEntity, UserDto> userMapper) {
        this.userService = userService;
        this.accountService = accountService;
        this.accountMapper = accountMapper;
        this.userMapper = userMapper;
    }
    @PostMapping(path = "/users/{id}/accounts")
    public ResponseEntity<UserDto> createAccount(@RequestBody AccountDto account,
                                              @PathVariable("id") Long id) {

        Optional<UserEntity> userEntityOptional = userService.findOne(id);

        if (userEntityOptional.isPresent()) {
            UserEntity userEntity = userEntityOptional.get();
            UserDto userDto = userMapper.mapTo(userEntity);

            // Set the userDto in the account
            account.setUserDto(userDto);

            // Map DTO to Entity
            AccountEntity accountEntity = accountMapper.mapFrom(account);

            // Save account using service
            AccountEntity savedAccountEntity = accountService.save(accountEntity);

            // Return success response
            return new ResponseEntity(accountMapper.mapTo(savedAccountEntity), HttpStatus.CREATED);
        } else {
            // Handle the case where no user is found with the given id
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping(path = "/users/{id}/accounts")
    public List<AccountDto> listAccounts(@PathVariable("id") Long id) {
        List<AccountEntity> accounts = accountService.findByUserId(id);
        return accounts.stream()
                .map(accountMapper::mapTo)
                .collect(Collectors.toList());
    }

    @GetMapping(path = "/users/{id}/accounts/{acc_id}")
    public ResponseEntity<AccountDto> getAccount(@PathVariable("id") Long id,@PathVariable("acc_id") Long acc_id) {
        AccountEntity foundAccount = accountService.findOneAcc(id,acc_id);
        if(foundAccount.getAcc_id() != null){
            AccountDto accountDto = accountMapper.mapTo(foundAccount);
            return new ResponseEntity<>(accountDto, HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PatchMapping(path = "/users/{id}/accounts/{acc_id}")
    public ResponseEntity<AccountDto> editAccount(@PathVariable("id") Long id,@PathVariable("acc_id") Long acc_id,
                                                  @RequestBody AccountDto accountDto){
        if(!accountService.isExists(acc_id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Optional<UserEntity> userEntityOptional = userService.findOne(id);
        if (userEntityOptional.isPresent()) {
            UserEntity userEntity = userEntityOptional.get();
            UserDto userDto = userMapper.mapTo(userEntity);
            accountDto.setAcc_id(acc_id);
            accountDto.setUserDto(userDto);
            AccountEntity accountEntity = accountMapper.mapFrom(accountDto);
            AccountEntity updatedAccount = accountService.partialUpdate(id, accountEntity);
            return new ResponseEntity<>(
                    accountMapper.mapTo(updatedAccount),
                    HttpStatus.OK);
        }
        else {
            // Handle the case where no user is found with the given id
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(path = "/users/{id}/accounts/{acc_id}")
    public ResponseEntity deleteAccount(@PathVariable("id") Long id, @PathVariable("acc_id") Long acc_id) {
        accountService.delete(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}


