package com.vrio.portallicitante.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET = "sua-chave-secreta-muito-segura-e-com-mais-de-32-caracteres";

    private final long EXPIRATION = 1000 * 60 * 60; // 1 hora

    public String gerarToken(String cpf, int idFuncionario) {
        Date agora = new Date();
        Date validade = new Date(agora.getTime() + EXPIRATION);

        return Jwts.builder()
                .setSubject(cpf)
                .claim("idFuncionario", idFuncionario) // adiciona id ao payload
                .setIssuedAt(agora)
                .setExpiration(validade)
                .signWith(getKey())
                .compact();
    }

    public String getCpfDoToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public int getFuncionarioIdFromToken(String token) {
        // Remove "Bearer " e espaços extras
        String cleanToken = token.replace("Bearer", "").trim();

        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(cleanToken)
                .getBody()
                .get("idFuncionario", Integer.class);
    }

    public boolean tokenValido(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    private Key getKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }
}
