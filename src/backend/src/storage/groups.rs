use ic_stable_structures::{
    memory_manager::{MemoryManager, MemoryId, VirtualMemory},
    DefaultMemoryImpl, StableBTreeMap, StableCell,
};
use std::cell::RefCell;
use crate::models::group::Group; // replace with your actual path


type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static MEMORY_MANAGER: MemoryManager<DefaultMemoryImpl> =
        MemoryManager::init(DefaultMemoryImpl::default());

    // Groups table
    pub static GROUPS: RefCell<StableBTreeMap<u64, Group, Memory>> =
        RefCell::new(StableBTreeMap::init(MEMORY_MANAGER.with(|m| m.get(MemoryId::new(2)))));

    // Auto-increment counter for group IDs
    pub static GROUP_COUNTER: RefCell<StableCell<u64, Memory>> =
        RefCell::new(StableCell::init(MEMORY_MANAGER.with(|m| m.get(MemoryId::new(3))), 0)
            );
}

// Helper to generate new IDs
pub fn next_group_id() -> u64 {
    GROUP_COUNTER.with(|c| {
        let mut binding = c.borrow_mut();
        let current = binding.get();
        //let current = c.borrow().get();
        let new_id = current + 1;
        binding.set(new_id);
        new_id
    })
}



// pub fn reset_groups() {
//     GROUPS.with(|db| {
//         *db.borrow_mut() = StableBTreeMap::init(
//             MEMORY_MANAGER.with(|m| m.get(MemoryId::new(0)))
//         );
//     });
// }