package com.vrio.portallicitante.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Lote {
    private int fkIdEmpresa; // pode ser null ate o momento do arremate;
    private int fkIdPregao;
    private int fkIdEditalDeLicitacao;
    private int idLote;
    private double valorArremate; // pode ser null ate o momento do arremate;
    private String numeroLote;
    private String objetoDoLote;
    private String quantidade;
    private String modelo_veiculo;
    private String ano_fabricacao;
    private String tipo_veiculo;
}
