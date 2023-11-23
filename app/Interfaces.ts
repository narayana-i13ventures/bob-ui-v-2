export interface ThinkBeyondCards {
    cardName?: string;
    cardNumber?: number;
    cardInfo?: {
        heading?: string;
        text?: string;
        placeholder?: string;
        _id?: string;
    }[];
    started?: boolean;
    complete?: boolean;
    selected?: boolean;
    locked?: boolean;
    type?: string;
    open?: boolean;
    bmc_status?: string;
    id?: string;
}


export interface CardInfo {
    heading: string;
    text: string;
    placeholder: string;
}


export interface OnBoardingStage {
    id: number;
    content: string;
    example?: string;
    getter?: string;
    setter?: (value: any) => any;
}

export interface Company {
    companyName?: string;
    industry?: string;
    vertical?: string;
    companyType?: string;
    companySize?: string;
    companyHeadquarters?: string;
    companyTargetRegions?: string;
    fundingStage?: string;
    annualRevenue?: string;
    businessModel?: string;
}



export interface BMCCards {
    id?: number;
    cardName?: string;
    selected?: boolean;
    keyPoints?: string;
    locked?: boolean;
    loadingKeyPoints?: boolean;
    chat?: Array<{ role: string; content: string }>;
    size?: string;
    labelHeading?: string;
    label?: string[];
}



export interface CVPCards {
    id?: number;
    cardName?: string;
    selected?: boolean;
    keyPoints?: any;
    locked?: boolean;
    loadingKeyPoints?: boolean;
    chat?: any[];
    size?: string;
    labelHeading?: string;
    label?: string[];
    score?:number;
}