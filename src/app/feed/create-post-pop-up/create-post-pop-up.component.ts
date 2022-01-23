import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { PostService } from 'src/app/Services/PostService';
import {PostDto} from "../../dto/PostDto";

@Component({
  selector: 'app-create-post-pop-up',
  templateUrl: './create-post-pop-up.component.html',
  styleUrls: ['./create-post-pop-up.component.css']
})
export class CreatePostPopUpComponent implements OnInit {
  formPost: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private dialogRef: MatDialogRef<CreatePostPopUpComponent>,
              private formBuilder: FormBuilder, private postService: PostService) { }

  ngOnInit(): void {
    this.formPost =  this.formBuilder.group({
      url:  new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required])
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addPost() {
    if(this.formPost.status === 'VALID'){
      const postDto: PostDto = {
        userId :this.data.userId,
        url: this.formPost.get('url').value,
        tagsId: [],
        text: this.formPost.get('text').value
      }
        this.postService.addPost(postDto).subscribe(result => {
          if(result.ok){
            alert('Post adicionado com sucesso');
            this.closeDialog();
          }
        });
    }else {
      alert('Verifique os campos');
    }

  }
}
