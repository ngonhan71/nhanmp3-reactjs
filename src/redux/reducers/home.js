const initialState = {
    sectionOne: {},
    sectionTwo: {},
    top100NoiBat: {},
    top100VietNam: {}
  };
  const homeReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case "ADD_SECTIONS": {
        console.log({
            ...state,
            sectionOne: action.payload.sectionOne,
            sectionTwo: action.payload.sectionTwo,
        })
        return {
          ...state,
          sectionOne: action.payload.sectionOne,
          sectionTwo: action.payload.sectionTwo,
        };
      }

      case "ADD_TOP100": {
        console.log({
            ...state,
            top100NoiBat: action.payload.top100NoiBat,
            top100VietNam: action.payload.top100VietNam,
        })
        return {
          ...state,
          top100NoiBat: action.payload.top100NoiBat,
          top100VietNam: action.payload.top100VietNam,
        };
      }
  
  
      default: {
        return state;
      }
    }
  };
  
  export default homeReducer;
  