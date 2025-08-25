use candid::Principal;
use ic_cdk::{update, query};

use crate::models::group::{Group, GroupProfile};
use crate::storage::groups::{GROUPS, next_group_id};
use crate::Post;


/// Create a new group
#[update]
pub fn create_group(name: String) -> u64 {
    let caller = ic_cdk::caller();
    let id = next_group_id();
    let group = Group::new(id, caller, name);

    GROUPS.with(|db| {
        db.borrow_mut().insert(id, group);
    });

    id
}

/// Get group by ID
#[query]
pub fn get_group(id: u64) -> Option<Group> {
    GROUPS.with(|db| db.borrow().get(&id))
}

/// Update group profile (admin-only)
#[update]
pub fn update_group_profile(id: u64, profile: GroupProfile) -> Result<(), String> {
    let _caller = ic_cdk::caller();
    GROUPS.with(|db| {
        let mut db = db.borrow_mut();
        match db.get(&id) {
            Some(mut group) => {
                // if !group.admins.contains(&caller) {
                //     return Err("Only admins can update profile".to_string());
                // }
                group.set_profile(profile);
                db.insert(id, group);
                Ok(())
            }
            None => Err("Group not found".to_string()),
        }
    })
}

/// Join group
#[update]
pub fn join_group(id: u64) -> Result<(), String> {
    let caller = ic_cdk::caller();
    GROUPS.with(|db| {
        let mut db = db.borrow_mut();
        match db.get(&id) {
            Some(mut group) => {
                group.add_member(caller);
                db.insert(id, group);
                Ok(())
            }
            None => Err("Group not found".to_string()),
        }
    })
}

/// Leave group
#[update]
pub fn leave_group(id: u64) -> Result<(), String> {
    let caller = ic_cdk::caller();
    GROUPS.with(|db| {
        let mut db = db.borrow_mut();
        match db.get(&id) {
            Some(mut group) => {
                group.remove_member(&caller);
                db.insert(id, group);
                Ok(())
            }
            None => Err("Group not found".to_string()),
        }
    })
}

#[query]
pub fn list_groups() -> Vec<Group> {
    GROUPS.with(|db| db.borrow().iter().map(|entry|entry.value().clone()).collect::<Vec<Group>>())
}

// #[query]
// pub fn list_posts() -> Vec<Post> {
//     GROUPS.with(|db| db.borrow().iter().map(|entry|entry.value().clone()).collect::<Vec<Post>>())
// }

#[query]
fn get_group_posts(group_id: u64) -> Option<Vec<Post>> {
    GROUPS.with(|db| {
        if let Some(group) = db.borrow().get(&group_id) {
            group.show_posts()
        } else {
            vec![].into()
        }
    })
}

// #[update]
// pub fn clear_groups() {
//     GROUPS.with(|db| {
//         let mut db = db.borrow_mut();
//         // Collect keys first because we can't modify while iterating
//         let keys: Vec<_> = db.iter().map(|entry| *entry.key()).collect();
//         for key in keys {
//             db.remove(&key);
//         }
//     });
// }


// #[update]
// pub fn reset_groups() {
//     reset_groups();
// }

// #[update]
// pub fn reset_groups() {
//     GROUPS.with(|db| {
//         *db.borrow_mut() = StableBTreeMap::init(DefaultMemoryImpl::default());
//     });
// }

// /// Promote member to admin (admin-only)
// #[update]
// pub fn add_admin(id: u64, user: Principal) -> Result<(), String> {
//     let caller = ic_cdk::caller();
//     GROUPS.with(|db| {
//         let mut db = db.borrow_mut();
//         match db.get(&id) {
//             Some(mut group) => {
//                 if !group.admins.contains(&caller) {
//                     return Err("Only admins can add another admin".to_string());
//                 }
//                 group.add_admin(user);
//                 db.insert(id, group);
//                 Ok(())
//             }
//             None => Err("Group not found".to_string()),
//         }
//     })
// }