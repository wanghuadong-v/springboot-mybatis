package com.jxdinfo.mybatisclient.service.impl;

import com.jxdinfo.mybatisclient.dao.IEmpDao;
import com.jxdinfo.mybatisclient.model.Emp;
import com.jxdinfo.mybatisclient.service.IEmpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@Service
public class EmpServiceImpl implements IEmpService {
    @Resource
    private IEmpDao empDao;

    @Override
    public List<HashMap<String,Object>> getAllEmp() {
        return empDao.getAll1();
    }
}
