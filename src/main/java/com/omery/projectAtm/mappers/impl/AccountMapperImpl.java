package com.omery.projectAtm.mappers.impl;

import com.omery.projectAtm.domain.dto.AccountDto;
import com.omery.projectAtm.domain.dto.UserDto;
import com.omery.projectAtm.domain.entities.AccountEntity;
import com.omery.projectAtm.domain.entities.UserEntity;
import com.omery.projectAtm.mappers.Mapper;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AccountMapperImpl implements Mapper<AccountEntity, AccountDto> {

    private final ModelMapper modelMapper;

    private Mapper<UserEntity, UserDto> userMapper;
    @Autowired
    public AccountMapperImpl(ModelMapper modelMapper,Mapper<UserEntity, UserDto> userMapper ) {
        this.modelMapper = modelMapper;
        this.userMapper = userMapper;

        // Configure the mapper for nested mappings
    }

    @Override
    public AccountDto mapTo(AccountEntity accountEntity) {

        if(accountEntity.getUserEntity() != null){
            UserDto userDto = userMapper.mapTo((accountEntity.getUserEntity()));
            AccountDto resultDto = new AccountDto();
            resultDto.setUserDto(userDto);
            resultDto.setAcc_id(accountEntity.getAcc_id());
            resultDto.setTotalCredit(accountEntity.getTotalCredit());
            return resultDto;
        }
        else
            return modelMapper.map(accountEntity, AccountDto.class);
    }

    @Override
    public AccountEntity mapFrom(AccountDto accountDto) {
        if(accountDto.getUserDto() != null){
            UserEntity userEntity = userMapper.mapFrom((accountDto.getUserDto()));
            AccountEntity resultEntity = new AccountEntity();
            resultEntity.setUserEntity(userEntity);
            resultEntity.setAcc_id(accountDto.getAcc_id());
            resultEntity.setTotalCredit(accountDto.getTotalCredit());
            return resultEntity;
        }
        else
            return modelMapper.map(accountDto, AccountEntity.class);

    }
}
