import {EmotionalStateString} from "./EmotionalStateString";

export interface dtoUser {
  id_User?: string;
  username :string | null;
  password :string | null;
  emotional_State? : EmotionalStateString | null;
  nome? :string | null;
  email? :string | null;
  data_Nasc_User? :string | null;
  phone_Number? : string | null;
  imageUrl? :string | null;
  tags_Of_User? : string[] | null;
}
