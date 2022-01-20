import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {dtoUser} from "../dto/dtoUser";
import {logInService} from "./logInService";
import {RelationDto} from "../dto/RelationDto";
import {EMPTY, Observable} from "rxjs";
import {PostDto} from "../dto/PostDto";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = 'https://arqsi-dotnet.herokuapp.com/api/Post';

  customHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, access-control-allow-methods, access-control-allow-headers, Access-Control-Allow-Origin, X-XSRF-TOKEN'
  });

  public constructor(private http: HttpClient, private userService: logInService) {
  }

  public getPostsOfUserFriends(idUser: string): Observable<HttpResponse<PostDto>> {
        return this.http.get<PostDto>(`${this.url}/getPostsFromFriends/${idUser}`, {
          headers: this.customHeaders,
          withCredentials: false,
          observe: 'response'
        });
  }

  public addPost(post: PostDto, idUser: string): Observable<HttpResponse<PostDto>> {
    post.userId_Of_Post =idUser;
    return this.http.post<PostDto>(`${this.url}`, post, {
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

  public getPost(id: string): Observable<HttpResponse<PostDto>> {
    return this.http.get<PostDto>(`${this.url}/${id}`, {
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

  public addLikeOrDislikeToPost(idPost: string, isLike: boolean,idUser:string): Observable<HttpResponse<PostDto>> {
    let urlExtra = 'addLikePost';
    if (!isLike) {
      urlExtra = 'addDislikePost';
    }
    const likeOrDislikeDto = {
      _userId: idUser,
      _postId: idPost
    };
    return this.http.post<PostDto>(`${this.url}/${urlExtra}`, likeOrDislikeDto, {
      headers: this.customHeaders,
      withCredentials: false,
      observe: 'response'
    });
  }

  public addTagsToPost(idPost: string, Tags: []): Observable<HttpResponse<PostDto>> {
    const PostTags = {
      idPost: idPost,
      setTagDTOs: Tags
    }
    return this.http.put<PostDto>(`${this.url}/setTagsToPost`, PostTags, {
      headers: this.customHeaders,
      withCredentials: false,
      observe: 'response'
    });
  }


}
