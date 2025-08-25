use ic_stable_structures::{
    memory_manager::{MemoryManager, MemoryId, VirtualMemory},
    DefaultMemoryImpl, StableBTreeMap, StableCell,
};
use std::cell::RefCell;
use crate::models::post::Post;

type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static MEMORY_MANAGER: MemoryManager<DefaultMemoryImpl> =
        MemoryManager::init(DefaultMemoryImpl::default());

    // Posts table
    pub static POSTS: RefCell<StableBTreeMap<u64, Post, Memory>> =
        RefCell::new(StableBTreeMap::init(MEMORY_MANAGER.with(|m| m.get(MemoryId::new(4)))));

    // Auto-increment counter for Post IDs
    pub static POST_COUNTER: RefCell<StableCell<u64, Memory>> =
        RefCell::new(
            StableCell::init(MEMORY_MANAGER.with(|m| m.get(MemoryId::new(5))), 0)
        );
}

/// Generate the next Post ID
pub fn next_post_id() -> u64 {
    POST_COUNTER.with(|c| {
        let mut binding = c.borrow_mut();
        let current = binding.get();
        let new_id = current + 1;
        binding.set(new_id);
        new_id
    })
}