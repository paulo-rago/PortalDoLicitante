package com.vrio.portallicitante.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Lote {
    private int fkIdEmpresa; // pode ser null ate o momento do arremate;
    private int idLote;
    private String numeroLote;
    private String objetoDoLote;
    private String quantidade;
}
