import {PostActionDto} from "./PostActionDto";
import {CommentDto} from "./CommentDto";

export interface PostDto{
  userId?: string,
  text? : string,
  tagsId?: Array<string>,
  url?: string,
  postAction?: Array<PostActionDto>,
  postComment?: Array<CommentDto>,
  id?:  string
}
