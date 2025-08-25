use candid::Principal;
use ic_cdk::update;
use ic_cdk::query;

use crate::models::user::User;
use crate::storage::users::USERS;
use crate::UserProfile;


#[update]
pub fn login() -> i32 {
    let mut ch:i32=0;
    let caller = ic_cdk::caller();
    let user_exist=USERS.with(|db| {
        db.borrow().get(&caller).is_some()
    });
    if !(caller == Principal::anonymous()) {
        ch=1;//dont have Principal
    } 
    else {
        if user_exist{
            let user = User::new(caller);
        USERS.with(|db| {
            db.borrow_mut().insert(caller, user);
        });
        ch=2;//new user
        }else{ch=3;}//old user
    }
    ch
    
}

#[query]
pub fn get_user() -> Option<User> {
    let caller = ic_cdk::caller();
    USERS.with(|db| db.borrow().get(&caller))
}

#[query]
pub fn get_profile() -> UserProfile {
    let caller = ic_cdk::caller();
    USERS.with(|db| db.borrow().get(&caller)).unwrap().profile
}

// #[update]
// pub fn update_profile(){
//     let caller = ic_cdk::caller();
//     USERS.with(|db| db.borrow().get(&caller)).unwrap()::setProfile(UserProfile{

//     })
// }

#[update]
pub fn update_profile(
    bio: Option<String>,
    phone: Option<String>,
    email: Option<String>,
    country: Option<String>
) -> Result<i32, String> {
    let caller = ic_cdk::caller();
    USERS.with(|storage| {
        let mut map = storage.borrow_mut();
        if let Some(mut user) = map.get(&caller) {
            if let Some(new_bio) = bio {
                user.profile.bio = Some(new_bio);
            }
            if let Some(new_phone) = phone {
                user.profile.phone = Some(new_phone);
            }
            if let Some(new_email) = email {
                user.profile.email = Some(new_email);
            }
            if let Some(new_country) = country {
                user.profile.country = Some(new_country);
            }
            map.insert(caller, user.clone());
            Ok(1)
        } else {
            Err("user not found".to_string())
        }
    })
}


#[update]
pub fn set_basic_user(
    username: Option<String>,
    age: Option<i32>,
    gender: Option<bool>,
) -> Result<i32, String> {
    let caller = ic_cdk::caller();
    USERS.with(|storage| {
        let mut map = storage.borrow_mut();
        if let Some(mut user) = map.get(&caller) {
            if let Some(new_username) = username {
                user.username = Some(new_username);
            }
            if let Some(new_age) = age {
                user.age = Some(new_age);
            }
            if let Some(new_gender) = gender {
                user.gender = Some(new_gender);
            }
            map.insert(caller, user.clone());
            Ok(1)
        } else {
            Err("user not found".to_string())
        }
    })
}




// #[update]
// pub fn maintain_user(
// ) -> Result<i32, String> {
//     let caller = ic_cdk::caller();
//     USERS.with(|storage| {
//         let mut map = storage.borrow_mut();
//         if let Some(mut user) = map.get(&caller) {
//             if let new_groubs = vec![] {
//                 user.groups = new_groubs;
//             }
//             map.insert(caller, user.clone());
//             Ok(1)
//         } else {
//             Err("user not found".to_string())
//         }
//     })
// }



// #[update]
// pub fn clear_users() {
//     USERS.with(|db| {
//         let mut db = db.borrow_mut();
//         // Collect keys first because we can't modify while iterating
//         let keys: Vec<_> = db.iter().map(|entry| *entry.key()).collect();
//         for key in keys {
//             db.remove(&key);
//         }
//     });
// }

// #[update]
// pub fn reset_users() {
//     USERS.with(|db| {
//         *db.borrow_mut() = StableBTreeMap::init(VirtualMemory::<DefaultMemoryImpl>::default());
//     });
// }