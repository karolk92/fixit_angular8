import { ParameterName } from './parameter-name';

export interface Parameter {
    id?: number;
    name: ParameterName;
    value: string;
}
