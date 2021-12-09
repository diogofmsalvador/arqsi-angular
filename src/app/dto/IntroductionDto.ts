import {ResponseString} from "./ResponseString";

export interface IntroductionDto{
  introduction_Id: string;
  introduction_Request_From_User?: string;
  introduction_Request_To_User?: string;
  message_To_User_Middle? : string;
  message_To_User_Objective? :string;
  status? : ResponseString;
}
