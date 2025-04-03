package com.seunome.portallicitante.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TesteConexaoController {
    @GetMapping("/api/ping")
    public String ping() {
        return "Portal do Licitante está rodando! ✅";
    }
}