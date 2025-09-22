import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CarInfo {
  'id' : bigint,
  'model' : string,
  'owner' : Principal,
  'make' : string,
  'year' : number,
  'description' : string,
}
export interface Group {
  'id' : bigint,
  'members' : Array<Principal>,
  'posts' : [] | [BigUint64Array | bigint[]],
  'profile' : GroupProfile,
}
export interface GroupProfile {
  'country' : [] | [string],
  'name' : string,
  'description' : [] | [string],
  'category' : [] | [string],
}
export interface Post {
  'id' : bigint,
  'content' : string,
  'author' : Principal,
  'likes' : Array<Principal>,
  'group_id' : bigint,
}
export type Result = { 'Ok' : null } |
  { 'Err' : string };
export type Result_1 = { 'Ok' : number } |
  { 'Err' : string };
export type Result_2 = { 'Ok' : bigint } |
  { 'Err' : string };
export type Result_3 = { 'Ok' : CarInfo } |
  { 'Err' : string };
export interface User {
  'id' : Principal,
  'age' : [] | [number],
  'groups' : [] | [BigUint64Array | bigint[]],
  'username' : [] | [string],
  'likes' : [] | [BigUint64Array | bigint[]],
  'gender' : [] | [boolean],
  'posts' : [] | [BigUint64Array | bigint[]],
  'friends' : Array<Principal>,
  'profile' : UserProfile,
}
export interface UserProfile {
  'bio' : [] | [string],
  'country' : [] | [string],
  'email' : [] | [string],
  'phone' : [] | [string],
}
export interface _SERVICE {
  'create_carinfo' : ActorMethod<[string, string, number, string], bigint>,
  'create_group' : ActorMethod<[string], bigint>,
  'create_post' : ActorMethod<[string, bigint], bigint>,
  'get_carinfo' : ActorMethod<[bigint], [] | [CarInfo]>,
  'get_group' : ActorMethod<[bigint], [] | [Group]>,
  'get_group_posts' : ActorMethod<[bigint], [] | [Array<Post>]>,
  'get_post' : ActorMethod<[bigint], [] | [Post]>,
  'get_profile' : ActorMethod<[], UserProfile>,
  'get_user' : ActorMethod<[], [] | [User]>,
  'join_group' : ActorMethod<[bigint], Result>,
  'leave_group' : ActorMethod<[bigint], Result>,
  'like_post' : ActorMethod<[bigint], Result>,
  'list_carinfos' : ActorMethod<[], Array<CarInfo>>,
  'list_groups' : ActorMethod<[], Array<Group>>,
  'login' : ActorMethod<[], number>,
  'set_basic_user' : ActorMethod<
    [[] | [string], [] | [number], [] | [boolean]],
    Result_1
  >,
  'show_likes' : ActorMethod<[bigint], Result_2>,
  'unlike_post' : ActorMethod<[bigint], Result>,
  'update_carinfo' : ActorMethod<
    [bigint, [] | [string], [] | [string], [] | [number], [] | [string]],
    Result_3
  >,
  'update_group_profile' : ActorMethod<[bigint, GroupProfile], Result>,
  'update_profile' : ActorMethod<
    [[] | [string], [] | [string], [] | [string], [] | [string]],
    Result_1
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
