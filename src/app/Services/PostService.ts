import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {dtoUser} from "../dto/dtoUser";
import {logInService} from "./logInService";
import {RelationDto} from "../dto/RelationDto";
import {EMPTY, Observable} from "rxjs";
import {PostDto} from "../dto/PostDto";
import {PostActionDto} from "../dto/PostActionDto";
import {CommentDto} from "../dto/CommentDto";
import {CommentAddDto} from "../dto/CommentAddDto";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = 'https://arqsi-node.herokuapp.com/api/post';

  customHeaders = new HttpHeaders({
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, access-control-allow-methods, access-control-allow-headers, Access-Control-Allow-Origin, X-XSRF-TOKEN'
  });

  public constructor(private http: HttpClient, private userService: logInService) {
  }


  public addPost(post: PostDto): Observable<HttpResponse<PostDto>> {
    return this.http.post<PostDto>(`${this.url}/create`, post, {
          headers: this.customHeaders,
          withCredentials: false,
          observe: 'response'
        });
  }

  public addCommentToPost(idUser: string , text: string, postId: string): Observable<HttpResponse<PostDto>> {
    const commentDTO: CommentAddDto = {
      idPost: postId,
      userId: idUser,
      text: text
    };
    return this.http.put<PostDto>(`${this.url}/addComentToPost`, commentDTO, {
      headers: this.customHeaders,
      withCredentials: false,
      observe: 'response'
    });
  }

  public getPostOfUser(idUser: string | undefined): Observable<HttpResponse<PostDto[]>> {
    return this.http.get<PostDto[]>(`${this.url}/findPostsOfUser?userId=${idUser}`, {
      headers: this.customHeaders,
      withCredentials: false,
      observe: 'response'
    });
  }

  public addLikeOrDislikeToPost(idPost: string , isLike: boolean,idUser:string): Observable<HttpResponse<PostDto>> {

    const likeOrDislikeDto: PostActionDto = {
      userId: idUser,
      idPost: idPost,
      isLike: isLike
    };
    return this.http.post<PostDto>(`${this.url}/addActionToPost`, likeOrDislikeDto, {
      headers: this.customHeaders,
      withCredentials: false,
      observe: 'response'
    });
  }
  public deleteLikeOrDislikeToPost(idPost: string , isLike: boolean,idUser:string): Observable<any>{
    const likeOrDislikeDto: PostActionDto = {
      userId: idUser,
      idPost: idPost,
      isLike: isLike
    };
     return this.http.put<PostDto>(`${this.url}/deleteActionToPost`, likeOrDislikeDto, {
      headers: this.customHeaders,
      withCredentials: false,
      observe: 'response'
    });
  }


  public addTagsToPost(idPost: string, Tags: []): Observable<HttpResponse<PostDto>> {
    const PostTags: PostDto = {
      id: idPost,
      tagsId: Tags
    }
    return this.http.put<PostDto>(`${this.url}/setTagsToPost`, PostTags, {
      headers: this.customHeaders,
      withCredentials: false,
      observe: 'response'
    });
  }


  public deletePost(id: string): Observable<HttpResponse<PostDto>> {
    return this.http.delete<PostDto>(`${this.url}/${id}`, {
      headers: this.customHeaders,
      withCredentials: false,
      observe: 'response'
    });
  }

  public updatePost(post: PostDto): Observable<HttpResponse<PostDto>> {
    return this.http.put<PostDto>(`${this.url}`, post, {
      headers: this.customHeaders,
      withCredentials: false,
      observe: 'response'
    });
  }
}
