import {RelationString} from "./RelationString";

export interface RelationDto {
  id_UserA?: string;
  id_UserB?: string ;
  relation_Type?: RelationString;
  connection_Strength_A_To_B?: number;
  connectionOpinion_Of_UserA? : number;
  connection_Strength_B_To_A?: number;
  connection_Opinion_B_To_A?: number;
}
