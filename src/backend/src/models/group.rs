use std::borrow::Cow;
use candid::{CandidType, Principal, Deserialize, encode_one, decode_one};
use serde::Serialize;
use ic_stable_structures::storable::Storable;
use crate::Post;
use crate::storage::posts::POSTS;
use crate::storage::users::USERS;

#[derive(CandidType, Deserialize, Serialize, Clone, Debug, PartialEq, Eq)]
pub struct Group {
    pub id: u64,
    pub members: Vec<Principal>,
    pub posts: Option<Vec<u64>>,
    pub profile: GroupProfile,
    // pub admins: Vec<Principal>,
}

#[derive(CandidType, Clone, Debug, Deserialize, Serialize, PartialEq, Eq)]
pub struct GroupProfile {
    pub name: String,
    pub description: Option<String>,
    pub country: Option<String>,
    pub category: Option<String>, // e.g., "Cars", "Tuning", "Classic Cars"
}

impl Storable for Group {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(encode_one(self).expect("Failed to encode Group"))
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        decode_one(&bytes).expect("Failed to decode Group")
    }

    fn into_bytes(self) -> Vec<u8> {
        encode_one(self).expect("Failed to encode Group")
    }

    const BOUND: ic_stable_structures::storable::Bound =
        ic_stable_structures::storable::Bound::Unbounded;
}

impl Group {
    pub fn new(id: u64, creator: Principal, name: String) -> Group {
        let u_vec = USERS.with(|db| db.borrow().iter().map(|entry|entry.value().id).collect::<Vec<Principal>>());
        USERS.with(|db| {
            let mut db = db.borrow_mut();
    
            // Collect all user IDs first (to avoid borrowing issues)
            let user_ids: Vec<_> = db.iter().map(|entry| *entry.key()).collect();
    
            for uid in user_ids {
                if let Some(mut user) = db.get(&uid).map(|entry| entry.clone()) {
                    // Add group to the user
                    match &mut user.groups {
                        Some(groups) => groups.push(id),
                        None => user.groups = Some(vec![id]),
                    }
    
                    // Re-insert updated user
                    db.insert(uid, user);
                }
            }
        });
        Self {
            id,
            members: u_vec,
            posts: vec![].into(),
            // admins: vec![creator], // creator is first admin
            profile: GroupProfile {
                name,
                description: None,
                country: None,
                category: None,
                // image_url: None,
            },
        }
    }


    // pub fn show_posts(&self) -> Vec<Post> {
    //     POSTS.with(|db| {
    // self.posts
    //     .iter()
    //     .filter_map(|pid| db.borrow().get(pid)) // fetch each post by ID
    //     .collect()
    //     })
    // }

    pub fn show_posts(&self) -> Option<Vec<Post>> {
        POSTS.with(|db| {
            let db_ref = db.borrow();
    
            // If there are no posts, return None
            let Some(post_ids) = &self.posts else {
                return None;
            };
    
            let posts: Vec<Post> = post_ids
                .iter()
                .filter_map(|pid| db_ref.get(pid).map(|entry| entry.clone()))
                .collect();
    
            if posts.is_empty() {
                None
            } else {
                Some(posts)
            }
        })
    }


    pub fn set_profile(&mut self, profile: GroupProfile) {
        self.profile = profile;
    }

    pub fn get_profile(&self) -> &GroupProfile {
        &self.profile
    }

    pub fn add_member(&mut self, user: Principal) {
        if !self.members.contains(&user) {
            self.members.push(user);
        }
    }

    pub fn remove_member(&mut self, user: &Principal) {
        self.members.retain(|m| m != user);
        // self.admins.retain(|a| a != user);
    }

    // pub fn add_admin(&mut self, user: Principal) {
    //     if self.members.contains(&user) && !self.admins.contains(&user) {
    //         self.admins.push(user);
    //     }
    // }
}