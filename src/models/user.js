import {info} from '@/services/user'; 

export default {
  state: {
    user: {},
  },

  effects: {
    *getInfo({ payload }, { call, put }) {
      const { data } = yield call(info, payload);
      yield put({ type: 'infoSuccess', payload: data });
    },
  },

  reducers: {
    infoSuccess(state, { payload }) {
      return {
        ...state,
        user: payload,
      };
    },
  },

  test(state) {
    console.log('test');
    return state;
  },
};