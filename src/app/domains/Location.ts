import { ResourceDTO } from "./Resource";

export interface Location{
    id: number;
    name: string;
    resources?: Array<ResourceDTO>;
}

export interface LocationDTO{
    id: number;
    name: string;
}