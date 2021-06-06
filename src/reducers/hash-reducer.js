import defaultState from "../hashDefaultState.json";

console.log("defaultStateids")
console.log(defaultState.ids)

const prevHashMapping = {};

defaultState.ids.forEach((value, index) => {
  if(index !== 0 && index !== defaultState.ids.length - 1) {
    prevHashMapping[value] = { next: defaultState.ids[index + 1], prev: defaultState.ids[index - 1] }; 
  }
})

const firstHash = defaultState.ids[0];
const lastHash = defaultState.ids[defaultState.ids.length - 1];

prevHashMapping[firstHash] = { next: defaultState.ids[1], prev: null }
prevHashMapping[lastHash] = { next: null, prev: defaultState.ids[defaultState.ids.length - 2] }

console.log("prevHashMapping")
console.log(prevHashMapping)

defaultState["prevHashMapping"] = prevHashMapping;

defaultState["thisHash"] = defaultState.ids[0]; 
defaultState["prevHash"] = null; 
defaultState["nextHash"] = defaultState.ids[1];

const hashReducer = (state = defaultState, action) => {
  if (action.type === "HASH_INDEX_INCREMENT") {
    const { thisHash: current } = defaultState;

    const prevHashMapping = defaultState["prevHashMapping"] ;
    const { next } = prevHashMapping[current];
    const { newNext } = prevHashMapping[next]; 

    return {
      thisHash: next,
      prevHash: current,
      next: newNext,
      hashIndex: state.hashIndex + 1,
      prevHashIndex: state.hashIndex,
      ids: state.ids,
    };
  }
  if (action.type === "HASH_INDEX_DECREMENT") {

    const { thisHash: current, } = defaultState;
    const prevHashMapping = defaultState["prevHashMapping"] ;
    const { prev } = prevHashMapping[current];
    const { newPrev } = prevHashMapping[prev]; 

    return {
      thisHash: prev,
      nextHash: current,
      prevHash: newPrev,
      hashIndex: state.hashIndex - 1,
      prevHashIndex: state.hashIndex,
      ids: state.ids,
    };
  }
  if (action.type === "HASH_INDEX_GOTO") {
    const { index } = action.payload;
    const prevHashIndex = index - 1 > -1 ? index : null;
    return {
      hashIndex: index,
      prevHashIndex,
    };
  }
  if (action.type === "HASH_SET") {
    debugger;
    console.dir(state);
    // find hash index
    const { hash } = action.payload;
    const prevHashMapping = defaultState["prevHashMapping"] ;

    const { next, prev } = prevHashMapping[hash];

    // fetch previous and next hashes

    const { ids } = state;
    let newIndex = null;
    for (const [i, value] of ids.entries()) {
      console.log("%d: %s", i, value);
      if (value === hash) {
        newIndex = i;
        console.log("found!");
      }
    }
    return {
      thisHash: hash,
      // prevHash: prev,
      // nextHash: next,
      ids,
      prevHash: prev,
      nextHash: next,
      hashIndex: newIndex,
      prevHashIndex: newIndex - 1,
    };
  }

  return state;
};

export default hashReducer;
