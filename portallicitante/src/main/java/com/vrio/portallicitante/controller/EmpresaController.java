package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.model.Empresa;
import com.vrio.portallicitante.service.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody Empresa empresa) {
        try {
            empresaService.salvar(empresa);
            return ResponseEntity.ok("Empresa cadastrada com sucesso ✅");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Erro ao cadastrar empresa: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable int id, @RequestBody Empresa empresa) {
        try {
            empresa.setIdEmpresa(id);
            empresaService.atualizar(empresa);
            return ResponseEntity.ok("Empresa atualizada com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Erro ao atualizar empresa: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable int id) {
        try {
            empresaService.deletar(id);
            return ResponseEntity.ok("Empresa removida com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Erro ao deletar empresa: " + e.getMessage());
        }
    }
}
