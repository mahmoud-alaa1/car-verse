export const idlFactory = ({ IDL }) => {
  const CarInfo = IDL.Record({
    'id' : IDL.Nat64,
    'model' : IDL.Text,
    'owner' : IDL.Principal,
    'make' : IDL.Text,
    'year' : IDL.Nat16,
    'description' : IDL.Text,
  });
  const GroupProfile = IDL.Record({
    'country' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
    'category' : IDL.Opt(IDL.Text),
  });
  const Group = IDL.Record({
    'id' : IDL.Nat64,
    'members' : IDL.Vec(IDL.Principal),
    'posts' : IDL.Opt(IDL.Vec(IDL.Nat64)),
    'profile' : GroupProfile,
  });
  const Post = IDL.Record({
    'id' : IDL.Nat64,
    'content' : IDL.Text,
    'author' : IDL.Principal,
    'likes' : IDL.Vec(IDL.Principal),
    'group_id' : IDL.Nat64,
  });
  const UserProfile = IDL.Record({
    'bio' : IDL.Opt(IDL.Text),
    'country' : IDL.Opt(IDL.Text),
    'email' : IDL.Opt(IDL.Text),
    'phone' : IDL.Opt(IDL.Text),
  });
  const User = IDL.Record({
    'id' : IDL.Principal,
    'age' : IDL.Opt(IDL.Int32),
    'groups' : IDL.Opt(IDL.Vec(IDL.Nat64)),
    'username' : IDL.Opt(IDL.Text),
    'likes' : IDL.Opt(IDL.Vec(IDL.Nat64)),
    'gender' : IDL.Opt(IDL.Bool),
    'posts' : IDL.Opt(IDL.Vec(IDL.Nat64)),
    'friends' : IDL.Vec(IDL.Principal),
    'profile' : UserProfile,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'Ok' : IDL.Int32, 'Err' : IDL.Text });
  const Result_2 = IDL.Variant({ 'Ok' : IDL.Nat64, 'Err' : IDL.Text });
  const Result_3 = IDL.Variant({ 'Ok' : CarInfo, 'Err' : IDL.Text });
  return IDL.Service({
    'create_carinfo' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat16, IDL.Text],
        [IDL.Nat64],
        [],
      ),
    'create_group' : IDL.Func([IDL.Text], [IDL.Nat64], []),
    'create_post' : IDL.Func([IDL.Text, IDL.Nat64], [IDL.Nat64], []),
    'get_carinfo' : IDL.Func([IDL.Nat64], [IDL.Opt(CarInfo)], ['query']),
    'get_group' : IDL.Func([IDL.Nat64], [IDL.Opt(Group)], ['query']),
    'get_group_posts' : IDL.Func(
        [IDL.Nat64],
        [IDL.Opt(IDL.Vec(Post))],
        ['query'],
      ),
    'get_post' : IDL.Func([IDL.Nat64], [IDL.Opt(Post)], ['query']),
    'get_profile' : IDL.Func([], [UserProfile], ['query']),
    'get_user' : IDL.Func([], [IDL.Opt(User)], ['query']),
    'join_group' : IDL.Func([IDL.Nat64], [Result], []),
    'leave_group' : IDL.Func([IDL.Nat64], [Result], []),
    'like_post' : IDL.Func([IDL.Nat64], [Result], []),
    'list_carinfos' : IDL.Func([], [IDL.Vec(CarInfo)], ['query']),
    'list_groups' : IDL.Func([], [IDL.Vec(Group)], ['query']),
    'login' : IDL.Func([], [IDL.Int32], []),
    'set_basic_user' : IDL.Func(
        [IDL.Opt(IDL.Text), IDL.Opt(IDL.Int32), IDL.Opt(IDL.Bool)],
        [Result_1],
        [],
      ),
    'show_likes' : IDL.Func([IDL.Nat64], [Result_2], ['query']),
    'unlike_post' : IDL.Func([IDL.Nat64], [Result], []),
    'update_carinfo' : IDL.Func(
        [
          IDL.Nat64,
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Nat16),
          IDL.Opt(IDL.Text),
        ],
        [Result_3],
        [],
      ),
    'update_group_profile' : IDL.Func([IDL.Nat64, GroupProfile], [Result], []),
    'update_profile' : IDL.Func(
        [
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
        ],
        [Result_1],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
