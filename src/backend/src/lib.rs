mod models;
mod storage;
mod api;

pub use api::user_api::*;
pub use api::group_api::*;
pub use api::post_api::*;
pub use api::carinfo_api::*;
use crate::models::user::*;
use crate::models::group::*;
use crate::models::post::*;
use crate::models::carinfo::*;


// Export the interface for the smart contract.
ic_cdk::export_candid!();