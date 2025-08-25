use ic_cdk::{update, query};
use crate::models::carinfo::CarInfo;
use crate::storage::carsinfo::{CAR_INFOS, next_carinfo_id};
use candid::Principal;

#[update]
pub fn create_carinfo(make: String, model: String, year: u16, description: String) -> u64 {
    let caller = ic_cdk::caller(); 
    let id = next_carinfo_id();
    let car = CarInfo::new(id,caller, make, model, year, description);

    CAR_INFOS.with(|db| {
        db.borrow_mut().insert(id, car);
    });

    id
}

#[update]
pub fn update_carinfo(
    id: u64,
    make: Option<String>,
    model: Option<String>,
    year: Option<u16>,
    description: Option<String>,
) -> Result<CarInfo, String> {
    CAR_INFOS.with(|storage| {
        let mut map = storage.borrow_mut();
        if let Some(mut carinfo) = map.get(&id) {
            if let Some(new_make) = make {
                carinfo.make = new_make;
            }
            if let Some(new_model) = model {
                carinfo.model = new_model;
            }
            if let Some(new_year) = year {
                carinfo.year = new_year;
            }
            if let Some(new_desc) = description {
                carinfo.description = new_desc;
            }
            map.insert(id, carinfo.clone());
            Ok(carinfo)
        } else {
            Err("CarInfo not found".to_string())
        }
    })
}

#[query]
pub fn get_carinfo(id: u64) -> Option<CarInfo> {
    CAR_INFOS.with(|db| db.borrow().get(&id))
}

#[query]
pub fn list_carinfos() -> Vec<CarInfo> {
    CAR_INFOS.with(|db| db.borrow().iter().map(|entry|entry.value().clone()).collect::<Vec<CarInfo>>())
}