import {FeatureDTO} from "./feature-dto.type";

export type SideEffect = (dto: FeatureDTO) => void;
