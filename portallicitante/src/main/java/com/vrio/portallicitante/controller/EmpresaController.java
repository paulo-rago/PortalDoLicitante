package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.model.Empresa;
import com.vrio.portallicitante.service.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Empresa empresa) {
        try {
            int id = empresaService.salvar(empresa);
            empresa.setIdEmpresa(id);
            return ResponseEntity.ok(empresa);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao salvar empresa: " + e.getMessage());
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

    @GetMapping
    public ResponseEntity<?> listarTodas() {
        try {
            List<Empresa> empresas = empresaService.listarTodos();
            return ResponseEntity.ok(empresas);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao listar empresas: " + e.getMessage());
        }
    }
}
