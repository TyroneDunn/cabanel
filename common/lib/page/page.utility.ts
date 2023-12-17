import {Request} from "../app/request.type";

export const mapRequestToPage = (request: Request) => {
    if (request.queryParamMap === undefined) return {};

    return ({
        ...(request.queryParamMap['index'] && request.queryParamMap['limit']) && {
            page: {
                index: parseInt(request.queryParamMap['index']),
                limit: parseInt(request.queryParamMap['limit'])
            }
        },
    });
};
