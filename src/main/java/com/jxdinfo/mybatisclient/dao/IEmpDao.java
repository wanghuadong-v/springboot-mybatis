package com.jxdinfo.mybatisclient.dao;

import com.jxdinfo.mybatisclient.model.Emp;

import java.util.HashMap;
import java.util.List;


public interface IEmpDao {
    /*
    * 获取全部的员工信息
    * @return
    * */
    List<HashMap<String,Object>> getAll1();
}
