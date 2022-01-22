import {Component, Input, OnInit} from '@angular/core';
import { result } from 'cypress/types/lodash';
import { PostService } from 'src/app/Services/PostService';
import {PostDto} from "../../dto/PostDto";
import {CommentDto} from "../../dto/CommentDto";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: PostDto | undefined;
  @Input() idUser: string | undefined;
  comments: Array<CommentDto>| undefined;
  countLikes = 0;
  countDislikes = 0;
  isLiked = false;
  isDisliked = false;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.comments = this.post?.postComment;
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
    if(isLike){
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
    }else {
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
      });
    }
  }
}
