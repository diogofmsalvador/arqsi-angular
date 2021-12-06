import {ResponseString} from "./ResponseString";

export interface IntroductionCompletedDto{
  Id_Introduction: string;
  idUser_Middle?: string;
  idUser_Objective?: string;
  response_User_Start_To_User_Middle?: ResponseString;
  message_User_Start_To_Middle?: string;
  response_User_Middle_To_Objective?: ResponseString;
  message_To_User_Objective? : string;
  id_Mission_Of_Introduction? : ResponseString;
}

