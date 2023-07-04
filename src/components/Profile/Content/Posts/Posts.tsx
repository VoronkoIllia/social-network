import React, { memo } from "react";
import { connect, useDispatch } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { SUCCESSFUL_SUBMITING } from "../../../../redux/reducers/actions/actionsTypes";
import { profileActions } from "../../../../redux/reducers/profile-reducer";
import { AppStateType } from "../../../../redux/redux-store";
import { PostType } from "../../../../utils/types";
import {
  maxLength,
  required,
} from "../../../../utils/validators/form-validators";
import { Textarea } from "../../../common/FormControl/FormControl";
import s from "./Posts.module.css";
import { Post } from "./post/post";

const { addNewPost, updateNewPost } = profileActions;

const maxLenght10 = maxLength(10);

interface InputPostProps{
  onSubmit: (formData: any) => void
  handleSubmit?:()=>void
}

interface StateProps{
  posts: Array<PostType>
}
interface DispatchProps{
  updateNewPost: (text: string) => void
  addNewPost: () => void
}
type PostsPropsType = StateProps & DispatchProps;

const InputPost:React.FC<InjectedFormProps<{newPostText:string}, InputPostProps>&InputPostProps> = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.input}>
      <Field
        component={Textarea}
        validate={[required, maxLenght10]}
        name={"newPostText"}
      />
      <button>Add post</button>
    </form>
  );
};
const AddPostForm = reduxForm<{newPostText:string}, InputPostProps>({ form: "addPostForm" })(InputPost);

const Posts: React.FC<PostsPropsType> = (props) => {
  
  const dispatch = useDispatch();

  let postsData = props.posts;
  postsData.sort((a:PostType, b:PostType) => {
    if (a.id > b.id) return -1;
    else return 1;
  });
  let posts = postsData.map((el:PostType) => <Post key={el.id} text={el.text} />);

  //add-new-post
  let onSubmit = (formData:any) => {
    props.updateNewPost(formData.newPostText);
    props.addNewPost();
    dispatch({type: SUCCESSFUL_SUBMITING})
  };

  return (
    <div className={s.wrapper}>
      <AddPostForm onSubmit={onSubmit} />
      <div className={s.posts}>{posts}</div>
    </div>
  );
};
const mapStateToProps = (state:AppStateType) => {
  return {
    posts: state.profilePage.posts,
  };
};
const PostsWithMemo = memo(Posts);
export default connect<StateProps, DispatchProps, {}, AppStateType>(mapStateToProps, { addNewPost, updateNewPost })(PostsWithMemo);
