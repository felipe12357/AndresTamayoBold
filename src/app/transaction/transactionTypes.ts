import { franchiseEnum, paymentMethodEnum, salesTypeEnum, transactionFilterBySalesEnum, transactionFilterByTimeEnum, transationStateEnum } from "../utils/enumtypes";

export type TransactionModel = {
    id:string;
    status:transationStateEnum;
    paymentMethod:paymentMethodEnum;
    salesType:salesTypeEnum;
    createdAt:number;
    transactionReference:number,
    amount:number,
    deduction?:number,
    franchise?:franchiseEnum
}


export type TransactionFilterStateModel = {
    dateTime:transactionFilterByTimeEnum,
    salesType:transactionFilterBySalesEnum[],
    searchText:string
}

export enum transactionFilterTypeEnum  {
    DATE_TYPE,
    SALES_TYPE,
    SEARCH_TEXT
}


