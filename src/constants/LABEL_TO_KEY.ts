import type { DealFieldMap } from "../types/DealFieldMap";

export const LABEL_TO_KEY: Record<string, keyof DealFieldMap> = {
  "Placa": "PLACA",
  "Marca do Veículo": "VEIC_MARCA",
  "Modelo": "VEIC_MODELO",
  "Ano": "VEIC_ANO",
  "Valor Fipe": "FIPE_VALOR",
  "Fipe Ref": "FIPE_REF",
  "Codigo Fipe": "COD_FIPE",
  "Tipo Veículo": "VEIC_TIPO",
  "Nome Cliente": "CLIENTE",
};