use candid::Principal;
use ic_cdk::{update, query};

use crate::models::post::Post;
use crate::storage::posts::{POSTS, next_post_id};

/// Create a new post (personal or in a group)
#[update]
pub fn create_post(content: String, group_id: u64) -> u64 {
    let caller = ic_cdk::caller();
    let id = next_post_id();

    let post = Post::new(id, caller, content, group_id);

    POSTS.with(|db| {
        db.borrow_mut().insert(id, post);
    });

    id
}

/// Get a post by ID
#[query]
pub fn get_post(id: u64) -> Option<Post> {
    POSTS.with(|db| db.borrow().get(&id))
}

/// Like a post
#[update]
pub fn like_post(id: u64) -> Result<(), String> {
    let caller = ic_cdk::caller();
    POSTS.with(|db| {
        let mut db = db.borrow_mut();
        match db.get(&id) {
            Some(mut post) => {
                post.add_like(caller);
                db.insert(id, post);
                Ok(())
            }
            None => Err("Post not found".to_string()),
        }
    })
}

/// Unlike a post
#[update]
pub fn unlike_post(id: u64) -> Result<(), String> {
    let caller = ic_cdk::caller();
    POSTS.with(|db| {
        let mut db = db.borrow_mut();
        match db.get(&id) {
            Some(mut post) => {
                post.remove_like(&caller);
                db.insert(id, post);
                Ok(())
            }
            None => Err("Post not found".to_string()),
        }
    })
}

/// Show number of likes on a post
#[query]
pub fn show_likes(id: u64) -> Result<usize, String> {
    POSTS.with(|db| {
        match db.borrow().get(&id) {
            Some(post) => Ok(post.show_likes()),
            None => Err("Post not found".to_string()),
        }
    })
}