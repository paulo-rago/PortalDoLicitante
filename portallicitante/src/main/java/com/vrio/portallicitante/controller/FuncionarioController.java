package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.model.Funcionario;
import com.vrio.portallicitante.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    // ✅ CADASTRAR FUNCIONÁRIO COM FOTO
    @PostMapping("/cadastrar-com-foto")
    public ResponseEntity<?> cadastrarComFoto(
            @RequestPart("dados") Funcionario funcionario,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        try {
            // Cadastra o funcionário
            funcionario = funcionarioService.cadastrar(funcionario); // ⚠️ Captura o ID gerado

            // Se tiver foto, faz o upload
            if (file != null && !file.isEmpty()) {
                String nomeArquivo = "foto_" + funcionario.getIdFuncionario() + "_" + file.getOriginalFilename();

                // ✅ Pasta absoluta na raiz do projeto
                String diretorioUpload = System.getProperty("user.dir") + File.separator + "uploads";

                // Cria a pasta se não existir
                File diretorio = new File(diretorioUpload);
                if (!diretorio.exists()) {
                    diretorio.mkdirs();
                }

                // Caminho completo do arquivo
                String caminhoCompleto = diretorioUpload + File.separator + nomeArquivo;

                // Salva fisicamente
                file.transferTo(new File(caminhoCompleto));

                // Atualiza no banco o nome da foto
                funcionarioService.atualizarFoto(funcionario.getIdFuncionario(), nomeArquivo);
            }

            return ResponseEntity.ok(funcionario);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao cadastrar funcionário com foto.");
        }
    }

    // ✅ LISTAR TODOS
    @GetMapping
    public ResponseEntity<List<Funcionario>> listarTodos() {
        List<Funcionario> lista = funcionarioService.listarTodos();
        return ResponseEntity.ok(lista);
    }

    // ✅ ATUALIZAR
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> atualizar(
            @PathVariable int id,
            @RequestPart("dados") Funcionario funcionario,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        try {
            funcionario.setIdFuncionario(id);
            funcionarioService.atualizar(funcionario); // Atualiza dados no banco

            if (file != null && !file.isEmpty()) {
                String nomeArquivo = "foto_" + id + "_" + file.getOriginalFilename();

                // Diretório absoluto
                String diretorioUpload = System.getProperty("user.dir") + File.separator + "uploads";
                File diretorio = new File(diretorioUpload);
                if (!diretorio.exists()) {
                    diretorio.mkdirs();
                }

                // Caminho completo do arquivo
                String caminhoCompleto = diretorioUpload + File.separator + nomeArquivo;
                file.transferTo(new File(caminhoCompleto)); // Salva arquivo

                // Atualiza no banco o nome da nova foto
                funcionarioService.atualizarFoto(id, nomeArquivo);
            }

            return ResponseEntity.ok("Funcionário atualizado com sucesso.");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao atualizar funcionário com foto.");
        }
    }


    // ✅ DELETAR
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable int id) {
        funcionarioService.deletar(id);
        return ResponseEntity.ok("Funcionário deletado com sucesso.");
    }

    // ✅ BUSCAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> buscarPorId(@PathVariable int id) {
        Funcionario funcionario = funcionarioService.buscarPorId(id);
        if (funcionario != null) {
            return ResponseEntity.ok(funcionario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ SERVIR IMAGEM
    @GetMapping("/foto/{nomeArquivo}")
    public ResponseEntity<Resource> servirImagem(@PathVariable String nomeArquivo) {
        try {
            String diretorioUpload = System.getProperty("user.dir") + File.separator + "uploads";
            Path caminhoArquivo = Paths.get(diretorioUpload).resolve(nomeArquivo).normalize();
            Resource recurso = new UrlResource(caminhoArquivo.toUri());

            if (recurso.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // Troque para IMAGE_PNG se desejar
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + recurso.getFilename() + "\"")
                        .body(recurso);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
