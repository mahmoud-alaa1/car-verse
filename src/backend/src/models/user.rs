use std::borrow::Cow;
use candid::encode_one;
use candid::decode_one;
use candid::{CandidType, Principal, Deserialize};
use serde::{Serialize};
use ic_stable_structures::storable::Storable;
use crate::storage::groups::GROUPS;

#[derive(CandidType, Deserialize, Serialize, Clone, Debug, PartialEq, Eq)]
pub struct User {
    pub id: Principal,
    pub username: Option<String>,
    pub age: Option<i32>,
    pub gender: Option<bool>,
    pub friends: Vec<Principal>,
    pub groups: Option<Vec<u64>>,
    pub likes: Option<Vec<u64>>,
    pub posts: Option<Vec<u64>>,
    pub profile: UserProfile, 
}


#[derive(CandidType,Clone, Debug, Deserialize, Serialize, PartialEq, Eq)]
pub struct UserProfile {
    pub bio: Option<String>,
    pub phone: Option<String>,
    pub email: Option<String>,
    pub country: Option<String>
}



impl Storable for User {

    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(encode_one(self).expect("Failed to encode User"))
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        decode_one(&bytes).expect("Failed to decode User")
    }

    fn into_bytes(self) -> Vec<u8> {
        encode_one(self).expect("Failed to encode User")
    }

    const BOUND: ic_stable_structures::storable::Bound = 
        ic_stable_structures::storable::Bound::Unbounded;
}



impl User {
    pub fn new(id: Principal) -> User {
        let g_vec = GROUPS.with(|db| db.borrow().iter().map(|entry|entry.value().id).collect::<Vec<u64>>());
        GROUPS.with(|db| {
            let mut db = db.borrow_mut();
    
            // Collect all user IDs first (to avoid borrowing issues)
            let group_ids: Vec<_> = db.iter().map(|entry| *entry.key()).collect();
    
            for gid in group_ids {
                if let Some(mut group) = db.get(&gid).map(|entry| entry.clone()) {
                    // Add group to the group
                    match &mut group.members {
                        groups => groups.push(id),
                        //None => group.members = vec![id],
                    }
    
                    // Re-insert updated group
                    db.insert(gid, group);
                }
            }
        });
        Self{
            id,
            username: Some("verse".to_string()),
            age: None,
            gender: None,
            friends: Vec::new(),
            groups: Some(g_vec),
            likes: vec![].into(),
            posts: vec![].into(),
            profile: UserProfile{
                bio: None,
                phone: None,
                email: None,
                country: None
            }}
    }

    pub fn setProfile(&mut self, profile: UserProfile) {
        self.profile = profile;
    }

}





//


    //pub created_at: u64,
    //pub saves: Vec<postid>,
    //pub intrests: Vec<filter>,
    // pub settings: UserSettings,   // another struct
    // pub stats: UserStats,         // another struct



// pub struct UserSettings {
//     pub dark_mode: bool,
//     pub notifications: bool,
// }

// pub struct UserStats {
//     pub post_count: u64,
//     pub like_count: u64,
// }



    // fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
    //     candid::encode_one(self).unwrap().into()
    // }

    // fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
    //     candid::decode_one(&bytes).unwrap()
    // }
