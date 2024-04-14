export interface WindowWithAMOCRM extends Window {
    AMOCRM?: {
        data?: {
            current_card?: {
                id?: number;
                user?: {
                    name?: string;
                };
            };
            current_entity?: string;
        };
        widgets?: {
            system?: {
                domain?: string;
            };
        };
    };
}