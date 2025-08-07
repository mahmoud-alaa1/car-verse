use ic_cdk::api::caller;
use ic_stable_structures::{
    memory_manager::{MemoryId, MemoryManager},
    DefaultMemoryImpl, StableBTreeMap,
};
use std::cell::RefCell;

type Balance = u64;
type memo =
    ic_stable_structures::memory_manager::VirtualMemory<ic_stable_structures::DefaultMemoryImpl>;
//static MEMORY_MANAGER: DefaultMemoryManager = DefaultMemoryManager::init();

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
    RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

// static BALANCES: RefCell<StableBTreeMap<Principal, u64>> =
//     RefCell::new(StableBTreeMap::init(
//         MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0)))
//     ));

    static BALANCES: RefCell<StableBTreeMap<candid::Principal, Balance, memo>> =
        RefCell::new(StableBTreeMap::init(
            //MEMORY_MANAGER.get(MemoryId::new(0))
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0)))
        ));
}

#[ic_cdk::query]
fn get_balance() -> Balance {
    let user = caller();
    BALANCES.with(|b| b.borrow().get(&user).unwrap_or(0))
}

#[ic_cdk::update]
fn set_balance(amount: Balance) -> i32 {
    let sender = caller();

    BALANCES.with(|b| {
        b.borrow_mut().insert(sender, amount);
    });
    1
}

#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

#[ic_cdk::query]
fn whoami() -> candid::Principal {
    ic_cdk::caller()
}

// Export the interface for the smart contract.
ic_cdk::export_candid!();
