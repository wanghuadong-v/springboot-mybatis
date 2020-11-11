package com.jxdinfo.mybatisclient.controller;

import com.jxdinfo.mybatisclient.service.IEmpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;


@Controller

public class TestController {
    @Autowired
    private IEmpService empService;


    @RequestMapping(value = "/getAll")
    public String getAll(Model model){
        List<HashMap<String, Object>> allEmp = empService.getAllEmp();
        System.out.println(allEmp);
        return "/index";
    }

    @RequestMapping(value = "/getTestData")
    @ResponseBody
    public List<HashMap<String,Object>> getTestData(Model model){
        List<HashMap<String, Object>> allEmp = empService.getAllEmp();
        return allEmp;
    }

    @RequestMapping(value = "/toTest2")
    public String toTest2(Model model){
        List<HashMap<String, Object>> allEmp = empService.getAllEmp();
        model.addAttribute("test", "abcd");
        return "test2";
    }
    @RequestMapping(value = "/toTest3")
    public String toTest3(Model model){
        return "表格实现下拉框";
    }
    @RequestMapping(value = "/toTest4")
    public String toTest4(Model model){
        return "动态修改指定单元格数据";
    }
    @RequestMapping(value = "/getTableData")
    @ResponseBody
    public HashMap<String,Object> getTableData(Model model){
        List<HashMap<String, Object>> allEmp = empService.getAllEmp();
        HashMap<String, Object> data = new HashMap<>();
        data.put("code", 0);
        data.put("data",allEmp);
        return data;
    }
    @RequestMapping(value = "/toTable")
    public String toTable(Model model){
        return "table";
    }

}
