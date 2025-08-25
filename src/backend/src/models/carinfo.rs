use std::borrow::Cow;
use candid::{CandidType, Principal, Deserialize, encode_one, decode_one};
use serde::Serialize;
use ic_stable_structures::storable::Storable;

#[derive(CandidType, Deserialize, Serialize, Clone, Debug, PartialEq, Eq)]
pub struct CarInfo {
    pub id: u64,
    pub owner: Principal,
    pub make: String,
    pub model: String,
    pub year: u16,
    pub description: String,
}

impl Storable for CarInfo {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(encode_one(self).expect("Failed to encode CarInfo"))
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        decode_one(&bytes).expect("Failed to decode CarInfo")
    }

    fn into_bytes(self) -> Vec<u8> {
        encode_one(self).expect("Failed to encode CarInfo")
    }

    const BOUND: ic_stable_structures::storable::Bound =
        ic_stable_structures::storable::Bound::Unbounded;
}

impl CarInfo {
    pub fn new(
        id: u64,
        owner: Principal,
        make: String,
        model: String,
        year: u16,
        description: String,
    ) -> Self {
        Self {
            id,
            owner,
            make,
            model,
            year,
            description,
        }
    }

    pub fn update(
        &mut self,
        make: Option<String>,
        model: Option<String>,
        year: Option<u16>,
        description: Option<String>,
    ) {
        if let Some(m) = make {
            self.make = m;
        }
        if let Some(mo) = model {
            self.model = mo;
        }
        if let Some(y) = year {
            self.year = y;
        }
        if let Some(d) = description {
            self.description = d;
        }
    }
}