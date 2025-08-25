use ic_stable_structures::{
    memory_manager::{MemoryManager, MemoryId, VirtualMemory},
    DefaultMemoryImpl, StableBTreeMap, StableCell,
};
use std::cell::RefCell;
use crate::models::carinfo::CarInfo;

type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static MEMORY_MANAGER: MemoryManager<DefaultMemoryImpl> =
        MemoryManager::init(DefaultMemoryImpl::default());

    pub static CAR_INFOS: RefCell<StableBTreeMap<u64, CarInfo, Memory>> =
        RefCell::new(StableBTreeMap::init(MEMORY_MANAGER.with(|m| m.get(MemoryId::new(6)))));

    pub static CARINFO_COUNTER: RefCell<StableCell<u64, Memory>> =
        RefCell::new(StableCell::init(
            MEMORY_MANAGER.with(|m| m.get(MemoryId::new(7))),
            0,
        ));
}

pub fn next_carinfo_id() -> u64 {
    CARINFO_COUNTER.with(|c| {
        let mut binding = c.borrow_mut();
        let current = binding.get();
        let new_id = current + 1;
        binding.set(new_id);
        new_id
    })
}