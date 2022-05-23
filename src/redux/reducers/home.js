const initialState = {
    sectionCoTheBanMuonNghe: {},
    sectionNhacMoiMoiNgay: {},
    top100NoiBat: {},
    top100VietNam: {}
  };
  const homeReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case "ADD_SECTIONS": {
        console.log({
            ...state,
            sectionCoTheBanMuonNghe: action.payload.sectionCoTheBanMuonNghe,
            sectionNhacMoiMoiNgay: action.payload.sectionNhacMoiMoiNgay,
        })
        return {
          ...state,
          sectionCoTheBanMuonNghe: action.payload.sectionCoTheBanMuonNghe,
            sectionNhacMoiMoiNgay: action.payload.sectionNhacMoiMoiNgay,
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
  