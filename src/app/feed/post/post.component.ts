import {Component, Input, OnInit} from '@angular/core';
import { result } from 'cypress/types/lodash';
import { PostService } from 'src/app/Services/PostService';
import {PostDto} from "../../dto/PostDto";
import {CommentDto} from "../../dto/CommentDto";
import {logInService} from "../../Services/logInService";
class CommentUi {
  text: string | undefined ;
  username: string | undefined ;
}
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})


export class PostComponent implements OnInit {
  @Input() post: PostDto | undefined;
  @Input() idUser: string | undefined;
  @Input() username: string | undefined;
  comments: Array<CommentDto>| undefined;
  countLikes = 0;
  countDislikes = 0;
  isLiked = false;
  isDisliked = false;
  arrComments: Array<CommentUi> = [];
  constructor(private postService: PostService, private logInService: logInService) { }

  ngOnInit(): void {
    this.comments = this.post?.postComment;
    // @ts-ignore
    for(let comment of this.comments){
      if(comment.userId!== undefined) {
        this.logInService.getUserById(comment.userId).subscribe(result => {
          if(result.body?.username !== undefined && result.body?.username !== null) {
            const commentUi: CommentUi = {
              text: comment.text,
              username: result.body?.username
            };
            // @ts-ignore
            this.arrComments.push(commentUi);
          }
        });
      }

    }
    if(this.post?.postAction!== undefined) {
      for (let islike of this.post?.postAction) {
          if(islike.isLike){
            this.countLikes++;
          }else {
            this.countDislikes++;
          }
      }
    }
  }

  addLikeOrDislikeToPost(isLike: boolean) {
    if(isLike && !this.isDisliked){
      this.isLiked = !this.isLiked;
      if(this.isLiked){
        this.countLikes++;
        if(this.post?.id!== undefined && this.idUser!== undefined) {
          this.postService.addLikeOrDislikeToPost(this.post?.id, isLike, this.idUser).subscribe(result => {
          });
        }
      }else{
        this.countLikes--;
        if(this.post?.id!== undefined && this.idUser!== undefined) {
          this.postService.deleteLikeOrDislikeToPost(this.post?.id, isLike, this.idUser).subscribe(result => {
          });
        }
      }
    }else if(!isLike && !this.isLiked){
      this.isDisliked = !this.isDisliked;
      if(this.isDisliked){
        this.countDislikes++;
        if(this.post?.id!== undefined && this.idUser!== undefined) {
          this.postService.addLikeOrDislikeToPost(this.post?.id, isLike, this.idUser).subscribe(result => {
          });
        }
      }else{
        this.countDislikes--;
        if(this.post?.id!== undefined && this.idUser!== undefined) {
          this.postService.deleteLikeOrDislikeToPost(this.post?.id, isLike, this.idUser).subscribe(result => {
          });
        }
      }
    }
  }

  addComment(): void {
    if(this.post?.id!== undefined && this.idUser!== undefined) {
      this.postService.addCommentToPost(this.idUser, (document.getElementById('comment') as HTMLInputElement).value ,this.post?.id).subscribe(result => {
        // @ts-ignore
        console.log(localStorage.getItem("username"));
        const comment : CommentUi = {
        text: (document.getElementById('comment') as HTMLInputElement).value,
          // @ts-ignore
        username: localStorage.getItem('username')
      }
      this.arrComments.push(comment);
      });

    }
    (document.getElementById('comment') as HTMLInputElement).value = "";
    window.location.reload();
  }
}
