import { ExtratoItemType } from "./iFormulario";

export type ExtratoMensalType = {
  mes: string;
  extratos: ExtratoItemType[];
}[];