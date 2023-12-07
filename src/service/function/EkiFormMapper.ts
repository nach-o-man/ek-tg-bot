export class EkiFormMapper {
    public static mapForm(form: string): string | null {
        switch (form) {
            case 'SgN':
                return 'sg1';
            case 'SgG':
                return 'sg2';
            case 'SgP':
                return 'sg3';
            case 'SgAdt':
                return '';
            case 'PlN':
                return 'pl1';
            case 'PlG':
                return 'pl2';
            case 'PlP':
                return 'pl3';
            case 'Sup':
                return 'ma';
            case 'Inf':
                return 'da';
            case 'IndPrSg1':
                return 'pr1';
            case 'IndPrPs_':
                return 'prneg';
            case 'IndIpfSg1':
                return 'past1';
            case 'PtsPtPsNeg':
                return 'pastneg';
            default:
                return null;
        }
    }
}
