//initial state types


//action creators types

//parent types
export interface IIndexable{
    [key: string]: string | null;
}

//other types
export type PhotosType = {
  large: string | null,
  small:string|null
}
export type UserType = {
  id: number,
  name: string,
  uniqueUrlName: string | null,
  status: string | null,
  photos: PhotosType
  followed:boolean,
}
export type ProfileType = {
  aboutMe: string|null,
  lookingForAJob: boolean,
  lookingForAJobDescription: string|null,
  fullName: string,
  contacts: ContactsType,
  photos: PhotosType
}
export interface ContactsType extends IIndexable{
    github: string|null
    vk: string|null
    facebook: string|null
    instagram: string|null
    twitter: string|null
    website: string|null
    mainLink: string|null
    youtube: string | null,
}
export type PostType = { id: number, text: string, likesCount: number }
export type MenuListItem = { name: string, link: string }
export type MessageType = {
  name: string, text:string
}
export type ContactType = {
  id:number, name:string
}
export type inferLiteralType<T> = T extends { [key: string]: infer U } ? U : never