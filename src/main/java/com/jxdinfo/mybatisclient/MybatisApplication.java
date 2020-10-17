package com.jxdinfo.mybatisclient;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@MapperScan("com.jxdinfo.mybatisclient.dao")//告诉spring容器dao接口的位置，spring会根据这个位置帮我们创建dao层的组件
public class MybatisApplication extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(MybatisApplication.class);
    }

    @Override//为了打包springboot项目
    protected SpringApplicationBuilder configure(
            SpringApplicationBuilder builder) {
        return builder.sources(this.getClass());
    }
}
