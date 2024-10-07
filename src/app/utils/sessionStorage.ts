import { TransactionFilterStateModel, transactionFilterTypeEnum } from "../transaction/transactionTypes"
import { transactionFilterBySalesEnum, transactionFilterByTimeEnum } from "./enumtypes";



export const saveFilterState=(val:unknown, type:transactionFilterTypeEnum)=>{
    let currentValue = loadFilterState();
    switch (type) {
        case transactionFilterTypeEnum.DATE_TYPE:{
            const valToInsert = val as transactionFilterByTimeEnum;
            currentValue.dateTime =valToInsert; 
            break;
        }
        case transactionFilterTypeEnum.SALES_TYPE:{
            const valToInsert = val as transactionFilterBySalesEnum[];
            currentValue.salesType =[...valToInsert];
            break;
        }
        case transactionFilterTypeEnum.SEARCH_TEXT:{
            currentValue.searchText =val as string;
            break;
        }
        default:
            break;
    }

    sessionStorage.setItem('filter_state',JSON.stringify(currentValue))
}

export const loadFilterState=():TransactionFilterStateModel=>{
    const val = sessionStorage.getItem('filter_state');
    return (val) ? JSON.parse(val) : {
        dateTime:transactionFilterByTimeEnum.MONTH,
        salesType:[ transactionFilterBySalesEnum.ALL],
        searchText:''
    }
}