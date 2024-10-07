export enum transationStateEnum  {
    SUCCESSFULL='SUCCESSFULL',
    REJECTED='REJECTED',
}

export enum paymentMethodEnum {
    BANCOLOMBIA = 'BANCOLOMBIA',
    CARD = 'CARD',
    DAVIPLATA = 'DAVIPLATA',
    NEQUI = 'NEQUI',
    PSE = 'PSE'
}

export enum salesTypeEnum {
    PAYMENT_LINK = 'PAYMENT_LINK',
    TERMINAL = 'TERMINAL',

}

export enum transactionFilterBySalesEnum {
    PAYMENT_LINK = 'Link de pago',
    TERMINAL = 'datáfono',
    ALL = 'ALL'
}

export enum franchiseEnum {
    MASTERCARD = 'MASTERCARD',
    VISA = 'VISA'
}

export enum transactionFilterByTimeEnum {
    TODAY='Today',
    WEEK ='Week',
    MONTH = 'Month'
}