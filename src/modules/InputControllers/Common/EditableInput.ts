import {Nullable, Optional} from "@/core/Common/Common";

export interface EditableInputHandlerNext {
    (result: boolean, message: Optional<string>): void;
}

export interface EditableInputHandler<T = string> {
    (value: Nullable<T>, next: EditableInputHandlerNext): void;
}