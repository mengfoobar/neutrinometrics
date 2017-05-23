import { combineReducers } from 'redux';
import {createChartReducerInstance} from './baseChartReducer.js';
import BaseTableReducer from './baseTableReducer.js'

import LoginModalReducer from './loginModalReducer.js';
import SettingsModalReducer from './settingsModalReducer';
import RegisterModalReducer from './registerModalReducer.js';
import NavbarReducer from './navbarReducer.js'




const rootReducer = combineReducers({
    multiArea:createChartReducerInstance("multiArea"),

    tinyAreaAggA:createChartReducerInstance("tinyAreaAggA"),
    tinyAreaAggB:createChartReducerInstance("tinyAreaAggB"),
    tinyAreaAggC:createChartReducerInstance("tinyAreaAggC"),
    tinyAreaAggD:createChartReducerInstance("tinyAreaAggD"),

    pieChartA:createChartReducerInstance("pieChartA"),
    pieChartB:createChartReducerInstance("pieChartB"),
    pieChartC:createChartReducerInstance("pieChartC"),
    pieChartD:createChartReducerInstance("pieChartD"),

    vBarChartA:createChartReducerInstance("vBarChartA"),
    vBarChartB:createChartReducerInstance("vBarChartB"),

    lineChartCustomEvents:createChartReducerInstance("lineChartCustomEvents"),

    fixedTableUserStats:BaseTableReducer("fixedTableUserStats"),
    fixedTableUserEvents:BaseTableReducer("fixedTableUserEvents"),


    loginModal: LoginModalReducer,
    registerModal: RegisterModalReducer,
    navbar: NavbarReducer,
    settingsModal: SettingsModalReducer


});

export default rootReducer;
