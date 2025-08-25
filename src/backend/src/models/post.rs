use std::borrow::Cow;
use candid::{CandidType, Principal, Deserialize, encode_one, decode_one};
use serde::Serialize;
use ic_stable_structures::storable::Storable;
use crate::storage::groups::GROUPS;
use crate::storage::users::USERS;

#[derive(CandidType, Deserialize, Serialize, Clone, Debug, PartialEq, Eq)]
pub struct Post {
    pub id: u64,
    pub author: Principal,
    pub group_id: u64,      // Some(group_id) if post is in a group, None if personal
    pub content: String,
    pub likes: Vec<Principal>,      // Who liked the post
    // pub timestamp: u64,             // Unix timestamp
}

impl Storable for Post {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(encode_one(self).expect("Failed to encode Post"))
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        decode_one(&bytes).expect("Failed to decode Post")
    }

    fn into_bytes(self) -> Vec<u8> {
        encode_one(self).expect("Failed to encode Post")
    }

    const BOUND: ic_stable_structures::storable::Bound =
        ic_stable_structures::storable::Bound::Unbounded;
}

impl Post {
    pub fn new(id: u64, author: Principal, content: String, group_id: u64) -> Post {
        GROUPS.with(|db| {
            let mut db = db.borrow_mut();
    
            if let Some(mut group) = db.get(&group_id).map(|entry| entry.clone()) {
                match &mut group.posts {
                    Some(posts) => posts.push(id),
                    None => group.posts = Some(vec![id]),
                }
    
                db.insert(group_id, group);
            }
        });

        USERS.with(|db| {
            let mut db = db.borrow_mut();
    
            if let Some(mut user) = db.get(&author).map(|entry| entry.clone()) {
                match &mut user.posts {
                    Some(posts) => posts.push(id),
                    None => user.posts = Some(vec![id]),
                }
    
                db.insert(author, user);
            }
        });

        Self {
            id,
            author,
            group_id,
            content,
            likes: vec![],
        }
    }

    pub fn add_like(&mut self, userl: Principal) {
        if !self.likes.contains(&userl) {
            self.likes.push(userl);

            USERS.with(|db| {
                let mut db = db.borrow_mut();
        
                if let Some(mut user) = db.get(&userl).map(|entry| entry.clone()) {
                    match &mut user.likes {
                        Some(likes) => likes.push(self.id),
                        None => user.likes = Some(vec![self.id]),
                    }
        
                    db.insert(userl, user);
                }
            });

        }
    }

    pub fn remove_like(&mut self, userl: &Principal) {
        self.likes.retain(|u| u != userl);

        USERS.with(|db| {
            let mut db = db.borrow_mut();
    
            if let Some(mut user) = db.get(&userl).map(|entry| entry.clone()) {
                match &mut user.likes {
                    Some(likes) => likes.retain(|u| u != &self.id),
                    None => user.likes = Some(vec![self.id]),
                }
    
                db.insert(*userl, user);
            }
        });

    }

    /// Show number of likes
    pub fn show_likes(&self) -> usize {
        self.likes.len()
    }

}