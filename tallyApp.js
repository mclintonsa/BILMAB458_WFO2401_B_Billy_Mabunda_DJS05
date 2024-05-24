// Initial state
const initialState = {
    count: 0
  };
  
  // Action types
  const ADD = 'ADD';
  const SUBTRACT = 'SUBTRACT';
  const RESET = 'RESET';
  
  // Reducer function
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD:
        return { ...state, count: state.count + 1 };
      case SUBTRACT:
        return { ...state, count: state.count - 1 };
      case RESET:
        return { ...state, count: 0 };
      default:
        return state;
    }
  };
  
  // Store
  const store = {
    state: initialState,
    getState: () => store.state,
    dispatch: (action) => {
      store.state = reducer(store.state, action);
      store.observers.forEach(observer => observer(store.state));
    },
    observers: []
  };
  
  // Subscribe to state changes
  store.subscribe = (observer) => {
    store.observers.push(observer);
  };
  
  // Unsubscribe from state changes
  store.unsubscribe = (observer) => {
    store.observers = store.observers.filter(obs => obs !== observer);
  };
  
  // Log state changes to the console
  const logStateChanges = (state) => {
    console.log('State:', state);
  };
  
  // Subscribe to state changes
  store.subscribe(logStateChanges);
  
  // SCENARIO 1: Initial State Verification
  console.log('SCENARIO 1: Initial State Verification');
  console.log(store.getState()); // Output: { count: 0 }
  
  // SCENARIO 2: Incrementing the Counter
  console.log('\nSCENARIO 2: Incrementing the Counter');
  store.dispatch({ type: ADD });
  // Output: State: { count: 1 }
  store.dispatch({ type: ADD });
  // Output: State: { count: 2 }
  
  // SCENARIO 3: Decrementing the Counter
  console.log('\nSCENARIO 3: Decrementing the Counter');
  store.dispatch({ type: SUBTRACT });
  // Output: State: { count: 1 }
  
  // SCENARIO 4: Resetting the Counter
  console.log('\nSCENARIO 4: Resetting the Counter');
  store.dispatch({ type: RESET });
  // Output: State: { count: 0 }