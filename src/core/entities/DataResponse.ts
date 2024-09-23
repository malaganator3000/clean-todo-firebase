
import { ErrorResponse } from "./ErrorResponse";
import { SuccessResponse } from "./SuccessResponse";
export type DataResponse<T> = SuccessResponse<T> | ErrorResponse;
